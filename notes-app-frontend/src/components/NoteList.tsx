import type { Note } from "../types/Note";
import NoteItem from "./NoteItem";
import "./../styles/Note.list.css";

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
  onEdit: (id: string, note: Note) => void;
}

const NoteList = ({ notes, onDelete, onEdit }: NoteListProps) => {
  return (
    <div className="note-list">
      {notes.length === 0 ? (
        <p className="note-empty-message">Нотаток немає</p>
      ) : (
        notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
};

export default NoteList;
