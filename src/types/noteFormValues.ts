import type { NoteTag } from "../types/note";
export interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}