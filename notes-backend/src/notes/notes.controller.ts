import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { NotesService } from "./notes.service";
import { UpdateNoteDto } from "src/DTO/update.note.DTO";
import { CreateNoteDto } from "src/DTO/create.note.DTO";

@Controller("notes")
export class NotesController {
  constructor(private noteService: NotesService) {}

  @Get()
  getAllNotes() {
    return this.noteService.getAllNotes();
  }

  @Post()
  async createNotes(@Body() note: CreateNoteDto) {
    return this.noteService.createNote(note);
  }

  @Put(":id")
  async updateNote(@Param("id") id: string, @Body() updateNote: UpdateNoteDto) {
    return this.noteService.updateNote(id, updateNote);
  }

  @Delete(":id")
  async deleteNote(@Param("id") id: string) {
    return this.noteService.deleteNote(id);
  }
}
