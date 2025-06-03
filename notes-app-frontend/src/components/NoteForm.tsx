import { useState } from "react";
import type { CreateNoteDto } from "../types/Note";
import "./../styles/Note.form.css"; //

interface NoteFormProps {
  onSubmit: (note: CreateNoteDto) => void;
}

const NoteForm = ({ onSubmit }: NoteFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <input
        type="text"
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="note-input"
        required
      />
      <textarea
        placeholder="Текст нотатки"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="note-textarea"
        required
      />
      <button type="submit" className="note-submit-btn">
        Додати нотатку
      </button>
    </form>
  );
};

export default NoteForm;
