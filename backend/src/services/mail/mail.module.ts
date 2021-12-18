import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MAIL_JWT_SECRET } from "../../environments";
import { MailController } from "./mail.controller";

@Module({
  imports: [JwtModule.register({ secret: MAIL_JWT_SECRET })],
  controllers: [MailController],
})
export class MailModule {}
