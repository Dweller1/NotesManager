import { useState, useEffect } from "react";
import axios from "axios";
import type { Note, CreateNoteDto, UpdateNoteDto } from "../types/Note";

const API_URL = "http://localhost:3000/notes";

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [originalNotes, setOriginalNotes] = useState<Note[]>([]);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Note[]>(API_URL);
      setNotes(response.data);
      setOriginalNotes(response.data);
    } catch (err) {
      setError("Не вдалося завантажити нотатки");
    } finally {
      setLoading(false);
    }
  };

  const createNote = async (note: CreateNoteDto) => {
    try {
      const response = await axios.post<Note>(API_URL, note);
      setNotes([...notes, response.data]);
      setOriginalNotes([...originalNotes, response.data]);
    } catch (err) {
      setError("Не вдалося створити нотатку");
    }
  };

  const updateNote = async (id: string, note: UpdateNoteDto) => {
    try {
      const response = await axios.put<Note>(`${API_URL}/${id}`, note);
      setNotes(notes.map((n) => (n.id === id ? response.data : n)));
      setOriginalNotes(
        originalNotes.map((n) => (n.id === id ? response.data : n))
      );
    } catch (err) {
      setError("Не вдалося оновити нотатку");
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setNotes(notes.filter((n) => n.id !== id));
      setOriginalNotes(originalNotes.filter((n) => n.id !== id));
    } catch (err) {
      setError("Не вдалося видалити нотатку");
    }
  };

  const resetFilters = async () => {
    try {
      setLoading(true);
      await fetchNotes();
    } catch (err) {
      setError("Не вдалося скинути фільтри");
    }
  };

  const filterByDate = async (from: string, to: string) => {
    try {
      setLoading(true);

      const params = new URLSearchParams();
      if (from) params.append("fromDate", from);
      if (to) params.append("toDate", to);

      console.log("Sending filter request with:", params.toString());
      const response = await axios.get<Note[]>(
        `${API_URL}?${params.toString()}`
      );

      console.log("Received filtered notes:", response.data);
      setNotes(response.data);
      setError(null);
    } catch (err) {
      console.error("Filter error:", err);
      setError("Не вдалося застосувати фільтр");
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  const searchNotes = async (title: string) => {
    try {
      setLoading(true);

      if (!title.trim()) {
        await fetchNotes();
        return;
      }

      const filtered = originalNotes.filter((note) =>
        note.title.toLowerCase().includes(title.toLowerCase())
      );
      setNotes(filtered);
    } catch (err) {
      setError("Не вдалося виконати пошук");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return {
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
  };
};
