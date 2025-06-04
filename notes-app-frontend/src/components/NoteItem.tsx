import { useState } from "react";
import type { Note } from "../types/Note";
import "./../styles/Note.item.css";

interface NoteItemProps {
  note: Note;
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedNote: Note) => void;
}

const NoteItem = ({ note, onDelete, onEdit }: NoteItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);

  const handleSave = () => {
    onEdit(note.id, { ...note, title: editedTitle, content: editedContent });
    setIsEditing(false);
  };

  return (
    <div className="note-item">
      {isEditing ? (
        <div className="note-edit-mode">
          <input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="note-edit-input"
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="note-edit-textarea"
          />
          <button onClick={handleSave} className="note-save-btn">
            Зберегти
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="note-cancel-btn"
          >
            Скасувати
          </button>
        </div>
      ) : (
        <div>
          <h3 className="note-title">{note.title}</h3>
          <p className="note-content">{note.content}</p>
          <small className="note-date">
            {new Date(note.createdAt).toLocaleString()}
          </small>
          <div className="note-actions">
            <button
              onClick={() => setIsEditing(true)}
              className="note-edit-btn"
            >
              Редагувати
            </button>
            <button
              onClick={() => onDelete(note.id)}
              className="note-delete-btn"
            >
              Видалити
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteItem;
