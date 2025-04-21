class NoteList extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._notes = [];
  }

  static get observedAttributes() {
    return ["filter"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "filter") {
      this.render();
    }
  }

  loadNotes(notesData) {
    this._notes = notesData;
    this.render();
  }

  render() {
    this._shadowRoot.innerHTML = "";

    const style = document.createElement("style");
    style.textContent = `
      .note-list {
        margin-top: 2rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
      }

      @media (max-width: 425px) {
        .note-list {
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        }
      }
    `;
    this._shadowRoot.appendChild(style);

    const filter = this.getAttribute("filter") || "active";
    let filteredNotes;
    if (filter === "archived") {
      filteredNotes = this._notes.filter(
        (note) => note.archived === true || note.archived === "true",
      );
    } else {
      filteredNotes = this._notes.filter(
        (note) => note.archived === false || note.archived === "false",
      );
    }

    const container = document.createElement("div");
    container.className = "note-list";
    container.innerHTML = filteredNotes
      .map(
        (note) => `
          <note-item
            id="${note.id}"
            title="${note.title}"
            body="${note.body}"
            createdAt="${note.createdAt}"
            archived="${note.archived}"
          ></note-item>
        `,
      )
      .join("");

    this._shadowRoot.appendChild(container);
  }
}

customElements.define("note-list", NoteList);
