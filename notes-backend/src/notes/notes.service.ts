import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  Repository,
  Between,
  Like,
  MoreThanOrEqual,
  LessThanOrEqual,
} from "typeorm";
import { NoteEntity } from "../entity/note.entity";
import { CreateNoteDto } from "../DTO/create.note.DTO";
import { UpdateNoteDto } from "../DTO/update.note.DTO";

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(NoteEntity)
    private readonly notesRepository: Repository<NoteEntity>
  ) {}

  async getNoteById(id: string): Promise<NoteEntity> {
    const note = await this.notesRepository.findOne({ where: { id } });
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    return note;
  }

  async getFilteredNotes(
    title?: string,
    fromDate?: string,
    toDate?: string
  ): Promise<NoteEntity[]> {
    const where: any = {};

    if (title) {
      where.title = Like(`%${title}%`);
    }

    if (fromDate && toDate) {
      const startDate = new Date(fromDate);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(toDate);
      endDate.setHours(23, 59, 59, 999);

      where.createdAt = Between(startDate, endDate);
    } else if (fromDate) {
      const startDate = new Date(fromDate);
      startDate.setHours(0, 0, 0, 0);
      where.createdAt = MoreThanOrEqual(startDate);
    } else if (toDate) {
      const endDate = new Date(toDate);
      endDate.setHours(23, 59, 59, 999);
      where.createdAt = LessThanOrEqual(endDate);
    }

    return this.notesRepository.find({ where });
  }

  async createNote(createNoteDto: CreateNoteDto): Promise<NoteEntity> {
    try {
      const newNote = this.notesRepository.create(createNoteDto);
      return await this.notesRepository.save(newNote);
    } catch (error) {
      throw new HttpException(
        "Failed to create note",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateNote(
    id: string,
    updateNoteDto: UpdateNoteDto
  ): Promise<NoteEntity> {
    const existingNote = await this.getNoteById(id);

    try {
      await this.notesRepository.update(id, updateNoteDto);
      return await this.getNoteById(id);
    } catch (error) {
      throw new HttpException(
        "Failed to update note",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async deleteNote(id: string): Promise<void> {
    const result = await this.notesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
  }

  async getAllNotes(): Promise<NoteEntity[]> {
    return this.notesRepository.find();
  }
}
