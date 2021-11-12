import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { NextFunction, Request, Response } from "express";
import { getMongoRepository } from "typeorm";
import { User as UserEntity, Wallet } from "../../entities";

// eslint-disable-next-line
const Web3Token = require("web3-token");

declare global {
  // eslint-disable-next-line
  namespace Express {
    interface Request {
      currentUserAddress: string | null;
      user?: UserEntity;
    }
  }
}

export async function authMiddleware(
  req: Request,
  _: Response,
  next: NextFunction,
) {
  const token =
    req.headers["authorization"] || req.headers["Authorization"] || "";

  if (token) {
    try {
      const { address } = await Web3Token.verify(token);
      req.currentUserAddress = address || null;
    } catch (err) {}
  }

  if (req.currentUserAddress) {
    const wallet = await getMongoRepository(Wallet).findOne({
      address: req.currentUserAddress,
    });

    if (wallet) {
      const user = await getMongoRepository(UserEntity).findOne(wallet.userId);
      req.user = user || null;
    }
  }

  next();
}

export const CurrentUserAddress = createParamDecorator(
  (data: unknown, context: ExecutionContext): string | null => {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    if (req["user"]) {
      return req["user"];
    }

    if (req.raw && req.raw["user"]) {
      return req.raw["user"];
    }

    return null;
  },
);
