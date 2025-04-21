import {
  getNotes as apiGetNotes,
  getNotesArchived as apiGetNotesArchived,
  createNote as apiCreateNote,
  deleteNote as apiDeleteNote,
  archiveNote as apiArchiveNote,
  unarchiveNote as apiUnarchiveNote,
} from "../data/notes-api.js";

const AUTH_TOKEN = "12345";

const getNotes = async () => {
  return await apiGetNotes(AUTH_TOKEN);
};

const getNotesArchived = async () => {
  return await apiGetNotesArchived(AUTH_TOKEN);
};

const createNote = async (note) => {
  return await apiCreateNote(note, AUTH_TOKEN);
};

const deleteNote = async (id) => {
  return await apiDeleteNote(id, AUTH_TOKEN);
};

const archiveNote = async (id) => {
  return await apiArchiveNote(id, AUTH_TOKEN);
};

const unarchiveNote = async (id) => {
  return await apiUnarchiveNote(id, AUTH_TOKEN);
};

export {
  getNotes,
  getNotesArchived,
  createNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
};
