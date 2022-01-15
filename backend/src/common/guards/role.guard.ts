import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { SystemRole } from "../enums";

export const ROLES_KEY = "roles";
export const Roles = (...roles: SystemRole[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<SystemRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    let user = null;

    if (req["user"]) {
      user = req.user;
    } else if (req.raw && req.raw["user"]) {
      user = req.raw.user;
    }

    if (!user) {
      throw new UnauthorizedException("User not register");
    }

    return requiredRoles.some((role) => user.roles.includes(role));
  }
}
