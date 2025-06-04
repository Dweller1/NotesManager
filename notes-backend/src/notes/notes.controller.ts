import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { NotesService } from "./notes.service";
import { UpdateNoteDto } from "../DTO/update.note.DTO";
import { CreateNoteDto } from "../DTO/create.note.DTO";
import { NoteEntity } from "../entity/note.entity";

@Controller("notes")
export class NotesController {
  constructor(private readonly noteService: NotesService) {}

  @Get()
  async getNotes(
    @Query("title") title?: string,
    @Query("fromDate") fromDate?: string,
    @Query("toDate") toDate?: string
  ): Promise<NoteEntity[]> {
    this.validateDates(fromDate, toDate);
    return this.noteService.getFilteredNotes(title, fromDate, toDate);
  }

  @Get(":id")
  async getNoteById(@Param("id") id: string): Promise<NoteEntity> {
    const note = await this.noteService.getNoteById(id);
    if (!note) {
      throw new HttpException("Note not found", HttpStatus.NOT_FOUND);
    }
    return note;
  }

  @Post()
  async createNote(@Body() createNoteDto: CreateNoteDto): Promise<NoteEntity> {
    return this.noteService.createNote(createNoteDto);
  }

  @Put(":id")
  async updateNote(
    @Param("id") id: string,
    @Body() updateNoteDto: UpdateNoteDto
  ): Promise<NoteEntity> {
    try {
      return await this.noteService.updateNote(id, updateNoteDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(":id")
  async deleteNote(@Param("id") id: string): Promise<{ message: string }> {
    try {
      await this.noteService.deleteNote(id);
      return { message: "Note deleted successfully" };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  private validateDates(fromDate?: string, toDate?: string): void {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (fromDate && !dateRegex.test(fromDate)) {
      throw new BadRequestException(
        "Invalid fromDate format. Please use YYYY-MM-DD format"
      );
    }

    if (toDate && !dateRegex.test(toDate)) {
      throw new BadRequestException(
        "Invalid toDate format. Please use YYYY-MM-DD format"
      );
    }

    if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) {
      throw new BadRequestException("fromDate cannot be later than toDate");
    }
  }
}
