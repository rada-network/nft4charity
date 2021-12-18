import { Injectable } from "@nestjs/common";
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from "@webundsoehne/nest-fastify-file-upload";

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      limits: {
        fileSize: 2097152, // 2MB
      },
      fileFilter: (req: any, file: any, cb: any) => {
        const allowMimeTypes = ["image/jpg", "image/jpeg", "image/png"];

        if (allowMimeTypes.includes(file.minetype)) {
          cb(null, true);
        } else {
          cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
        }
      },
    };
  }
}
