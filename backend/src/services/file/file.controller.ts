import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Request,
  Res,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FastifyReply } from "fastify";
import { ApiCreatedResponse, ApiQuery } from "@nestjs/swagger";
import { FilesInterceptor } from "@webundsoehne/nest-fastify-file-upload";
import { isEnum } from "class-validator";
import { extname } from "path";
import { ResponsePutPresignedUrlDto } from "src/dtos";
import { FileField, PrefixStoragePath } from ".";
import { FileService } from "./file.service";

@Controller()
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly configService: ConfigService,
  ) {}

  @Get("rest/file/generatePutPresignedUrl")
  @ApiQuery({ name: "fileName" })
  @ApiCreatedResponse({
    description: "Generate PutPresignedUrl S3 Successfully",
    type: ResponsePutPresignedUrlDto,
  })
  async generatePutPresignedUrl(
    @Request() req: any,
    @Query() { fileName = "" },
  ): Promise<ResponsePutPresignedUrlDto> {
    const fileType = extname(fileName).toLowerCase().split(".")[1];
    const fileSupported = this.configService.get<string>(
      "FILE_SUPPORTED",
    ) as string;

    if (fileSupported?.split("|").indexOf(fileType) < 0) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Only ${fileSupported} files are allowed!`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.fileService.generatePutPresignedUrl(
      req.headers.campaignid,
      req.headers.userid,
      fileName,
      fileType,
    );
  }

  @Get("rest/file/generateGetPresignedUrl")
  @ApiQuery({ name: "fileName" })
  @ApiCreatedResponse({
    description: "Generate GetPresignedUrl S3 Successfully",
  })
  async generateGetPresignedUrl(@Query() { fileName = "" }): Promise<any> {
    const fileNames = fileName.split(",");
    return this.fileService.generateGetPresignedUrls(fileNames);
  }

  @Post("upload")
  @UseInterceptors(FilesInterceptor("images"))
  async upload(
    @Res() res: FastifyReply,
    @UploadedFiles() files: FileField[],
    @Query("folder") folder?: string,
  ) {
    if (folder && !isEnum(folder, PrefixStoragePath)) {
      return res.status(400).send({ message: "Please enter correct folder" });
    }

    const result = await Promise.all(
      files.map((f) => {
        return this.fileService.uploadFile(f, folder as PrefixStoragePath);
      }),
    );

    res.send(result);
  }
}
