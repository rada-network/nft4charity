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
  res: Response,
  next: NextFunction,
) {
  try {
    const token =
      req.headers["authorization"] || req.headers["Authorization"] || "";
    const { address } = await Web3Token.verify(token);
    req.currentUserAddress = address || null;

    const wallet = await getMongoRepository(Wallet).findOne({ address });
    const user = await getMongoRepository(UserEntity).findOne(wallet.userId);
    req.user = user || null;
  } catch (err) {
    if (err instanceof Error && err.message === "Token expired") {
      return next(new UnauthorizedException("Token expired"));
    }
  }

  next();
}

export const CurrentUserAddress = createParamDecorator(
  (data: unknown, context: ExecutionContext): string | null => {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    try {
      return req.currentUserAddress || req.raw.currentUserAddress;
    } catch (error) {
      return null;
    }
  },
);
