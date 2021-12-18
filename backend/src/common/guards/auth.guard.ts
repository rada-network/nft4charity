import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

// eslint-disable-next-line
const Web3Token = require("web3-token");

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    let addr = null;
    const token =
      req.headers["authorization"] || req.headers["Authorization"] || "";

    if (token) {
      try {
        const { address } = await Web3Token.verify(token);
        req.currentUserAddress = address || null;
      } catch (err) {
        if (err instanceof Error && err.message === "Token expired") {
          throw new UnauthorizedException("Token expired");
        }
        throw new UnauthorizedException("Invalid token");
      }
    }

    if (req["currentUserAddress"]) {
      addr = req["currentUserAddress"];
    } else if (req.raw && req.raw["currentUserAddress"]) {
      addr = req.raw["currentUserAddress"];
    }

    if (!addr) {
      throw new UnauthorizedException("Token required");
    }

    return true;
  }
}
