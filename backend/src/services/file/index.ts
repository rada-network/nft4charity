export interface FileField {
  buffer: Buffer;
  destination: string;
  encoding: string;
  fieldname: string;
  filename: string;
  mimetype: string;
  originalname: string;
  path: string;
  size: number;
}

export enum PrefixStoragePath {
  AVATAR = "avatar",
  IDENTIFIER = "identifier",
  ALBUM = "album",
}

export * from "./file.controller";
export * from "./file.module";
export * from "./file.service";
