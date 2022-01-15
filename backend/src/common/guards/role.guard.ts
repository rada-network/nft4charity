import { CampaignMember, User } from "src/entities";
import { getMongoRepository } from "typeorm";
import { isEnum } from "class-validator";
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  SetMetadata,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { SystemRole, CampaignRole } from "../enums";

export const ROLES_KEY = "roles";
export const Roles = (...roles: (SystemRole | CampaignRole)[]) =>
  SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<
      (SystemRole | CampaignRole)[]
    >(ROLES_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredRoles) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    let user: User | null = null;

    if (req["user"]) {
      user = req.user as User;
    } else if (req.raw && req.raw["user"]) {
      user = req.raw.user as User;
    }

    if (!user) {
      throw new UnauthorizedException("User not register");
    }

    const res = await Promise.all(
      requiredRoles.map(async (role) => {
        if (isEnum(role, SystemRole)) {
          return user.roles.includes(role as SystemRole);
        }

        const campaignId = ctx.getArgs<{ campaignId: string }>()["campaignId"];
        if (!campaignId) {
          throw new NotFoundException("Campaign not found");
        }

        const member = await getMongoRepository(CampaignMember).findOne({
          campaignId,
          userId: user._id.toString(),
        });
        if (!member) {
          throw new UnauthorizedException(
            "You are not member of this campaign.",
          );
        }

        return member.role === role;
      }),
    );

    return res.some(Boolean);
  }
}
