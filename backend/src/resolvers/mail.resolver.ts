import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UseGuards,
} from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { isEmail } from "class-validator";
import { AuthGuard, Role, Roles, RolesGuard } from "src/common";
import { User } from "src/entities";
import {
  MAIL_EXPIRE_TIME,
  MAIL_RESEND_VERIFICATION_TIME_MINUTE as RESEND_TIME,
} from "src/environments";
import { MailService } from "src/services";
import { getTimeToNow } from "src/utils";
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

    if (user.isEmailVerified) {
      throw new BadRequestException("User already verified.");
    }

    const lastVerifyAt = user.emailVerifiedAt;
    if (lastVerifyAt && getTimeToNow(lastVerifyAt, "minute") < RESEND_TIME) {
      const validTime = new Date(lastVerifyAt);
      validTime.setMinutes(validTime.getMinutes() + RESEND_TIME);
      const seconds = Math.abs(getTimeToNow(validTime, "second"));

      throw new BadRequestException(
        `Pls wait after ${seconds} seconds to re-send the mail.`,
      );
    }

    const now = new Date();
    const payload = {
      sub: user._id.toString(),
    };
    const token = this.jwtService.sign(payload, {
      expiresIn: MAIL_EXPIRE_TIME,
    });

    user.emailVerifiedAt = now;

    try {
      await getMongoRepository(User).save(user);
    } catch (error) {
      throw new InternalServerErrorException("Server error when updating user");
    }

    return MailService.sendVerifyEmailMail(user.firstName, email, token);
  }
}
