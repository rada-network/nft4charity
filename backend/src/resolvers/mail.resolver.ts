import {
  BadRequestException,
  NotFoundException,
  UseGuards,
} from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { isEmail } from "class-validator";
import { AuthGuard, Role, Roles, RolesGuard } from "src/common";
import { User } from "src/entities";
import { MAIL_EXPIRE_TIME } from "src/environments";
import { MailService } from "src/services";
import { getMongoRepository } from "typeorm";

@Resolver()
@UseGuards(AuthGuard, RolesGuard)
export class MailResolver {
  constructor(private readonly jwtService: JwtService) {}

  @Query(() => Boolean)
  @Roles(Role.USER)
  async verifyMail(@Args("email") email: string): Promise<boolean> {
    if (!isEmail(email)) {
      throw new BadRequestException("Arguemnt must be an valid email");
    }

    const user = await getMongoRepository(User).findOne({ email });
    if (!user) {
      throw new NotFoundException("Email not found.");
    }

    const now = new Date();
    const payload = {
      sub: user._id.toString(),
    };
    const token = this.jwtService.sign(payload, {
      expiresIn: MAIL_EXPIRE_TIME,
    });

    user.emailVerifiedAt = now;
    return MailService.sendVerifyEmailMail(user.firstName, email, token);
  }
}
