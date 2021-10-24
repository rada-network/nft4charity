import { ApiResponseProperty } from "@nestjs/swagger";

export class ResponsePutPresignedUrlDto {
  @ApiResponseProperty()
  fileName: string;

  @ApiResponseProperty()
  presignedUrl: string;

  @ApiResponseProperty()
  expires: number;

  @ApiResponseProperty()
  contentType: string;
}
