import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { S3 } from "aws-sdk";
import { ResponsePutPresignedUrlDto } from "./dtos/files/getFileUrl.dto";

const PUT_OBJECT = "putObject";
const GET_OBJECT = "getObject";
const EMPTY_STRING = "";

@Injectable()
export class FileService {
  private readonly bucket: string;
  private readonly s3: S3;
  private readonly expires: number;
  constructor(private readonly configService: ConfigService) {
    this.bucket = this.configService.get<string>("AWS_S3_BUCKET", EMPTY_STRING);
    const region = this.configService.get<string>(
      "AWS_S3_REGION",
      "ap-southeast-1",
    );
    const credentials = {
      accessKeyId: this.configService.get<string>(
        "AWS_S3_ACCESS_KEY_ID",
        EMPTY_STRING,
      ),
      secretAccessKey: this.configService.get<string>(
        "AWS_S3_SECRET_ACCESS_KEY",
        EMPTY_STRING,
      ),
    };
    this.s3 = new S3({
      credentials: credentials,
      region: region,
    });
    this.expires = this.configService.get<number>(
      "AWS_S3_PUT_PRESIGNED_EXPIRED_AT",
      60,
    );
  }

  private generateIt(s3: S3, bucket: string, key: string) {
    return s3.getSignedUrlPromise(GET_OBJECT, {
      Bucket: bucket,
      Key: key,
    });
  }

  public async generateGetPresignedUrls(keys: string[]): Promise<any> {
    try {
      const presignedUrls: any = [];
      await Promise.all(
        keys.map(async (key) => {
          const url = await this.generateIt(this.s3, this.bucket, key);
          presignedUrls.push({ fileName: key, url: url });
        }),
      );

      return presignedUrls;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async generatePutPresignedUrl(
    campaignId: string,
    userId: string,
    fileName: string,
    fileType: string,
  ): Promise<ResponsePutPresignedUrlDto> {
    try {
      const key = `campaigns/${campaignId}/${userId}/${fileName}`;

      const contentType = `image/${fileType}`;
      const params = {
        Bucket: this.bucket,
        Key: key,
        Expires: this.expires,
        ContentType: contentType,
      };

      console.log(params);
      const preSignedUrl = this.s3.getSignedUrl(PUT_OBJECT, params);

      return {
        fileName: key,
        presignedUrl: preSignedUrl,
        expires: this.expires,
        contentType,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
