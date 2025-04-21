const BASE_URL = "https://notes-api.dicoding.dev/v2";

const getNotes = async (authToken) => {
  try {
    const response = await fetch(`${BASE_URL}/notes`, {
      headers: { "X-Auth-Token": authToken },
    });
    if (!response.ok) {
      throw new Error("Gagal mengambil data notes");
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getNotesArchived = async (authToken) => {
  try {
    const response = await fetch(`${BASE_URL}/notes/archived`, {
      headers: { "X-Auth-Token": authToken },
    });
    if (!response.ok) {
      throw new Error("Gagal mengambil data notes archived");
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const createNote = async (note, authToken) => {
  try {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": authToken,
      },
      body: JSON.stringify(note),
    });
    if (!response.ok) {
      throw new Error("Gagal membuat note");
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const deleteNote = async (id, authToken) => {
  try {
    const response = await fetch(`${BASE_URL}/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": authToken,
      },
    });
    if (!response.ok) {
      throw new Error("Gagal menghapus note");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const archiveNote = async (id, authToken) => {
  try {
    const response = await fetch(`${BASE_URL}/notes/${id}/archive`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": authToken,
      },
    });
    if (!response.ok) {
      throw new Error("Gagal mengarsipkan note");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const unarchiveNote = async (id, authToken) => {
  try {
    const response = await fetch(`${BASE_URL}/notes/${id}/unarchive`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": authToken,
      },
    });
    if (!response.ok) {
      throw new Error("Gagal unarchive note");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export {
  getNotes,
  createNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
  getNotesArchived,
};
