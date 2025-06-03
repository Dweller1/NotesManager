import { useState, useEffect } from "react";
import axios from "axios";
import type { Note, CreateNoteDto, UpdateNoteDto } from "../types/Note";

const API_URL = "http://localhost:3000/notes"; // Адреса бекенду

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Note[]>(API_URL);
      setNotes(response.data);
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
    } catch (err) {
      setError("Не вдалося створити нотатку");
    }
  };

  const updateNote = async (id: string, note: UpdateNoteDto) => {
    try {
      const response = await axios.put<Note>(`${API_URL}/${id}`, note);
      setNotes(notes.map((n) => (n.id === id ? response.data : n)));
    } catch (err) {
      setError("Не вдалося оновити нотатку");
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setNotes(notes.filter((n) => n.id !== id));
    } catch (err) {
      setError("Не вдалося видалити нотатку");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return { notes, loading, error, createNote, updateNote, deleteNote };
};
