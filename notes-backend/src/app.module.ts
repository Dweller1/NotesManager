import { Module } from "@nestjs/common";
import { NoteModule } from "./notes/note.module";
import { DatabaseModule } from "./database.module";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "@hapi/joi";

@Module({
  imports: [
    NoteModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
    }),
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
