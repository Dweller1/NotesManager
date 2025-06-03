export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateNoteDto = Omit<Note, "id" | "createdAt" | "updatedAt">;
export type UpdateNoteDto = Partial<CreateNoteDto>;
