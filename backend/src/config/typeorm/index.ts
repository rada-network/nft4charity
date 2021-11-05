import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { MONGODB_URL } from "../../environments";
import { getMetadataArgsStorage } from "typeorm";

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      type: "mongodb",
      url: MONGODB_URL,
      entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
      // entities: ["../.../**/*.entity.ts", "../../**/*.entity.js"],
      synchronize: true,
      autoLoadEntities: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      keepConnectionAlive: true,
    };
  }
}
