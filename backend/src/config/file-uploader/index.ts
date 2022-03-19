import { Injectable } from "@nestjs/common";
import { MulterModuleOptions } from "fastify-file-interceptor/fastify-file-interceptor/src/multer/interface/fastify-multer-module-interface";

@Injectable()
export class MulterConfigService {
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
