import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { FileService } from "./file.service";
import { FileController } from "./file.controller";

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
