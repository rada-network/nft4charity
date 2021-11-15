import { BadRequestException, Controller, Get, Query } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/entities";
import { getMongoRepository } from "typeorm";

@Controller()
export class MailController {
  constructor(private readonly jwtService: JwtService) {}

  @Get("verify-mail")
  async verifyMail(@Query() { token }: { token: string }) {
    try {
      const { sub } = await this.jwtService.verifyAsync(token);
      const user = await getMongoRepository(User).findOne(sub as string);
      if (!user) {
        throw new BadRequestException("Invalid verify token");
      }

      user.isEmailVerified = true;
      await getMongoRepository(User).save(user);

      return "Your email is verified successfully.";
    } catch (error) {
      return "Verification failed. Try again later.";
    }
  }

  @Get("change-mail")
  async changeMail(@Query() { token }: { token: string }) {
    try {
      const { sub, email } = await this.jwtService.verifyAsync(token);
      const user = await getMongoRepository(User).findOne(sub as string);
      if (!user) {
        throw new BadRequestException("Invalid verify token");
      }

      user.email = email;
      user.isEmailVerified = true;
      await getMongoRepository(User).save(user);

      return "Your email is updated successfully.";
    } catch (error) {
      return "Updated failed. Try again later.";
    }
  }
}
