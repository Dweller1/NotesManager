import { Module } from "@nestjs/common";
import { NotesController } from "./notes.controller";
import { NotesService } from "./notes.service";
import { NoteEntity } from "src/entity/note.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([NoteEntity])],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NoteModule {}
