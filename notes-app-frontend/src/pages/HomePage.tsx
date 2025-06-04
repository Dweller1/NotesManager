import { useNotes } from "../hooks/useNotes";
import NoteList from "./../components/NoteList";
import NoteForm from "./../components/NoteForm";
import SearchBar from "./../components/SearchBar";
import DateFilter from "./../components/DateFilter";
import "./../styles/HomePage.css";

const HomePage = () => {
  const {
    notes,
    originalNotes,
    loading,
    error,
    createNote,
    updateNote,
    deleteNote,
    searchNotes,
    filterByDate,
    resetFilters,
  } = useNotes();

  const handleResetFilters = () => {
    resetFilters();
  };

  if (loading && notes.length === 0)
    return <div className="loading-message">Завантаження...</div>;
  if (error) return <div className="error-message">Помилка: {error}</div>;

  return (
    <div className="container">
      <h1 className="app-title">Мої нотатки</h1>

      <div className="controls">
        <div className="search-filter-row">
          <SearchBar onSearch={searchNotes} />
          <DateFilter onFilter={filterByDate} onReset={resetFilters} />
        </div>
        <button
          onClick={handleResetFilters}
          className="reset-all-button"
          disabled={loading}
        >
          Скинути всі фільтри
        </button>
      </div>

      <NoteForm onSubmit={createNote} />

      {notes.length === 0 && !loading ? (
        <p className="empty-message">
          {notes === originalNotes
            ? "Нотаток немає"
            : "Нотаток у вказаний період не знайдено"}
        </p>
      ) : (
        <NoteList
          notes={notes}
          onDelete={deleteNote}
          onEdit={(id, updatedNote) => updateNote(id, updatedNote)}
        />
      )}
    </div>
  );
};

export default HomePage;
