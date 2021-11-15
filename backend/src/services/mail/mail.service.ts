import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import { verifyMail } from "src/assets";
import { consoleLogger, mailConfig } from "src/config";

@Injectable()
export class MailService {
  static async sendVerifyEmailMail(
    name: string,
    email: string,
    token: string,
  ): Promise<boolean> {
    const transporter = await MailService.createTransporter();
    const socials = MailService.createSocials();
    const buttonLink = `${mailConfig.project.mailVerificationUrl}?token=${token}`;

    const mail = verifyMail
      .replace(new RegExp("--PersonName--", "g"), name)
      .replace(new RegExp("--ProjectName--", "g"), mailConfig.project.name)
      .replace(
        new RegExp("--ProjectAddress--", "g"),
        mailConfig.project.address,
      )
      .replace(new RegExp("--ProjectLogo--", "g"), mailConfig.project.logoUrl)
      .replace(new RegExp("--ProjectSlogan--", "g"), mailConfig.project.slogan)
      .replace(new RegExp("--ProjectColor--", "g"), mailConfig.project.color)
      .replace(new RegExp("--ProjectLink--", "g"), mailConfig.project.url)
      .replace(new RegExp("--Socials--", "g"), socials)
      .replace(new RegExp("--ButtonLink--", "g"), buttonLink);

    const mailOptions = {
      from: `"${mailConfig.mail.senderCredentials.name}" <${mailConfig.mail.senderCredentials.email}>`,
      to: email,
      subject: `Welcome to ${mailConfig.project.name} ${name}! Confirm Your Email`,
      html: mail,
    };

    return new Promise<boolean>((resolve) =>
      transporter.sendMail(mailOptions, async (error) => {
        if (error) {
          console.log(error);
          consoleLogger.warn("Some thing went wrong when sending email.");
          resolve(false);
        }
        resolve(true);
      }),
    );
  }

  private static createTransporter() {
    return nodemailer.createTransport({
      auth: {
        user: mailConfig.mail.service.user,
        pass: mailConfig.mail.service.pass,
      },
      host: mailConfig.mail.service.host,
      port: mailConfig.mail.service.port,
      secure: mailConfig.mail.service.secure,
    });
  }

  private static createSocials(): string {
    let socials = "";
    mailConfig.project.socials.forEach((social) => {
      socials += `<a href="${social[1]}" style="box-sizing:border-box;color:${mailConfig.project.color};font-weight:400;text-decoration:none;font-size:12px;padding:0 5px" target="_blank">${social[0]}</a>`;
    });
    return socials;
  }
}
