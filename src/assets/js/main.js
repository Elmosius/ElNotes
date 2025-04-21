import "../../components/app-bar.js";
import "../../components/footer-bar.js";
import "../../components/note-form.js";
import "../../components/note-list.js";
import "../../components/note-item.js";
import "../../components/loading.js";
import {
  getNotes,
  createNote,
  deleteNote,
  getNotesArchived,
  archiveNote,
  unarchiveNote,
} from "../../services/notes.js";

export const main = () => {
  // coba buat icon gerak gerak
  gsap.to(".material-symbols-outlined", {
    scale: 1.2,
    duration: 1,
    repeat: -1,
    yoyo: true,
  });

  const activeList = document.querySelector('note-list[filter="active"]');
  const archivedList = document.querySelector('note-list[filter="archived"]');
  const loading = document.getElementById("loading");

  async function updateNoteLists() {
    loading.style.display = "block";

    const activeNotes = await getNotes();
    const archivedNotes = await getNotesArchived();

    loading.style.display = "none";

    if (!activeNotes || !archivedNotes) {
      alert("Terjadi error saat mengambil data notes");
      return;
    }

    activeList.loadNotes(activeNotes);
    archivedList.loadNotes(archivedNotes);

    gsap.fromTo(
      activeList.shadowRoot.querySelectorAll("note-item"),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
    );

    gsap.fromTo(
      archivedList.shadowRoot.querySelectorAll("note-item"),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
    );
  }

  document.addEventListener("add-note", async (event) => {
    const noteData = event.detail;
    loading.style.display = "block";
    const createdNote = await createNote(noteData);
    loading.style.display = "none";

    if (!createdNote) {
      alert("Gagal membuat note. Silahkan coba lagi.");
      return;
    }

    updateNoteLists();
  });

  document.addEventListener("delete-note", async (event) => {
    const noteId = event.detail.id;
    loading.style.display = "block";
    const result = await deleteNote(noteId);
    loading.style.display = "none";

    if (!result) {
      alert("Gagal menghapus note. Silahkan coba lagi.");
      return;
    }

    updateNoteLists();
  });

  document.addEventListener("toggle-archive", async (event) => {
    const { id, archived } = event.detail;
    loading.style.display = "block";
    let result;

    if (archived) {
      result = await archiveNote(id);
      if (!result) {
        alert("Gagal mengarsipkan note. Silahkan coba lagi.");
        loading.style.display = "none";
        return;
      }
    } else {
      result = await unarchiveNote(id);
      if (!result) {
        alert("Gagal mengunarsip note. Silahkan coba lagi.");
        loading.style.display = "none";
        return;
      }
    }

    loading.style.display = "none";
    updateNoteLists();
  });

  updateNoteLists();
};

export default main;
