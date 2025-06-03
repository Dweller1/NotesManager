import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { NoteEntity } from "../entity/note.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateNoteDto } from "src/DTO/create.note.DTO";
import { UpdateNoteDto } from "src/DTO/update.note.DTO";

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(NoteEntity)
    private notesRepository: Repository<NoteEntity>
  ) {}
  getAllNotes() {
    return this.notesRepository.find();
  }

  async updateNote(id: string, note: UpdateNoteDto) {
    const existingNote = await this.notesRepository.findOne({ where: { id } });
    if (!existingNote) {
      throw new HttpException("Note not found", HttpStatus.NOT_FOUND);
    }
    await this.notesRepository.update(id, note);
    return this.notesRepository.findOne({ where: { id } });
  }

  async createNote(post: CreateNoteDto) {
    const newNote = this.notesRepository.create(post);
    await this.notesRepository.save(newNote);
    return newNote;
  }

  async deleteNote(id: string) {
    // if the post does not exist - exception, othewise delete the post, also it expects the id, not the entity itself
    const note = await this.notesRepository.findOne({
      where: { id },
    });
    if (!note) {
      throw new HttpException("Note not found", HttpStatus.NOT_FOUND);
    }
    await this.notesRepository.delete(id); // delete method expects id
    return { message: "Note deleted succesfully" };
  }
}
