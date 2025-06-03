import { useNotes } from "../hooks/useNotes";
import NoteList from "../components/NoteList";
import NoteForm from "../components/NoteForm";

const HomePage = () => {
  const { notes, loading, error, createNote, updateNote, deleteNote } =
    useNotes();

  if (loading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка: {error}</div>;

  return (
    <div>
      <h1>Мої нотатки</h1>
      <NoteForm onSubmit={createNote} />
      <NoteList
        notes={notes}
        onDelete={deleteNote}
        onEdit={(id, updatedNote) => updateNote(id, updatedNote)}
      />
    </div>
  );
};

export default HomePage;
