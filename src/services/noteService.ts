import axios from "axios";
import type { Note } from "../types/note";
import type { NoteFormValues } from "../types/noteFormValues";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const API_URL = "https://notehub-public.goit.study/api/notes";
const AUTH_HEADER = {
  Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
};

export async function fetchNotes(
  page: number = 1,
  search: string = ""
): Promise<FetchNotesResponse> {
  const response = await axios.get<FetchNotesResponse>(API_URL, {
    params: {
      page,
      perPage: 12,
      search: search || undefined,
    },
    headers: AUTH_HEADER,
  });

  console.log("DATA:", response.data);
  return response.data;
}

export async function createNote(noteValues: NoteFormValues): Promise<Note> {
  const response = await axios.post<Note>(API_URL + "/", noteValues, {
    headers: AUTH_HEADER,
  });

  console.log("CREATED NOTE:", response.data);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await axios.delete<Note>(`${API_URL}/${id}`, {
    headers: AUTH_HEADER,
  });

  console.log("DELETED NOTE:", response.data);
  return response.data;
}
