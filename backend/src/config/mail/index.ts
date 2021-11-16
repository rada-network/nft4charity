import {
  MAIL_CHANGE__URL,
  MAIL_SENDER_EMAIL,
  MAIL_SENDER_NAME,
  MAIL_VERIFICATION_URL,
  PROJECT_ADDRESS,
  PROJECT_COLOR,
  PROJECT_LOGO_URL,
  PROJECT_NAME,
  PROJECT_SLOGAN,
  SENDGRID_API_KEY,
} from "src/environments";

export const mailConfig = {
  mail: {
    service: {
      host: "smtp.sendgrid.net",
      port: 587,
      secure: false,
      user: "apikey",
      pass: SENDGRID_API_KEY,
    },
    senderCredentials: {
      name: MAIL_SENDER_NAME,
      email: MAIL_SENDER_EMAIL,
    },
  },
  project: {
    name: PROJECT_NAME,
    address: PROJECT_ADDRESS,
    logoUrl: PROJECT_LOGO_URL,
    slogan: PROJECT_SLOGAN,
    color: PROJECT_COLOR,
    socials: [["GitHub", "https://github.com/rada-network/nft4charity"]],
    url: "https://www-beta.rada.charity/",
    mailVerificationUrl: MAIL_VERIFICATION_URL,
    mailChangeUrl: MAIL_CHANGE__URL,
  },
};
