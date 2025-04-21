class NoteForm extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._styleElement = document.createElement("style");
  }

  connectedCallback() {
    this.render();
  }

  _updateStyle() {
    this._styleElement.textContent = `
      form {
        background-color: var(--color-2);
        display: flex;
        flex-direction: column;
        margin: 20px auto;
        padding: 20px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
      }
      label {
        margin-bottom: 5px;
        font-size: 1rem;
        font-weight: 600;
      }
      input, textarea {
        border-radius: 5px;
        padding: 8px;
        margin-bottom: 1.2rem;
        border: 1px solid #ddd;
      }
      button {
        font-size: 1rem;
        font-weight: 500;
        border-radius: 10px;
        padding: 10px 15px;
        background-color: var(--color-4);
        color: white;
        border: none;
        cursor: pointer;
      }
      button:hover {
        opacity: 0.8;
      }
      .error {
        color: red;
        font-size: 0.9rem;
        margin-top: -10px;
        margin-bottom: 10px;
      }

      
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  render() {
    this._emptyContent();
    this._updateStyle();
    this._shadowRoot.appendChild(this._styleElement);

    this._shadowRoot.innerHTML += `
      <form id="note-form">
        <label for="title">Title:</label>
        <input type="text" id="title" name="title" minlength="5" required>
        <div id="title-error" class="error"></div>

        <label for="body">Body:</label>
        <textarea id="body" name="body" rows="4" minlength="5" required></textarea>
        <div id="body-error" class="error"></div>

        <button type="submit">Add Note</button>
      </form>
    `;

    const form = this._shadowRoot.getElementById("note-form");
    const titleInput = form.querySelector("#title");
    const bodyInput = form.querySelector("#body");
    const titleError = this._shadowRoot.getElementById("title-error");
    const bodyError = this._shadowRoot.getElementById("body-error");

    titleInput.addEventListener("input", () => {
      const value = titleInput.value.trim();
      if (value === "") {
        titleError.textContent = "*Title tidak boleh kosong.";
      } else if (value.length < 5) {
        titleError.textContent = "*Minimal 5 karakter.";
      } else {
        titleError.textContent = "";
      }
    });

    bodyInput.addEventListener("input", () => {
      const value = bodyInput.value.trim();
      if (value === "") {
        bodyError.textContent = "*Body tidak boleh kosong.";
      } else if (value.length < 5) {
        bodyError.textContent = "*Minimal 5 karakter.";
      } else {
        bodyError.textContent = "";
      }
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const titleVal = titleInput.value.trim();
      const bodyVal = bodyInput.value.trim();

      this._addNote(titleVal, bodyVal);
      form.reset();
    });
  }

  _addNote(title, body) {
    const newNote = {
      id: `notes-${Date.now()}`,
      title: title,
      body: body,
      createdAt: new Date().toISOString(),
      archived: false,
    };

    const addNoteEvent = new CustomEvent("add-note", {
      detail: newNote,
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(addNoteEvent);
  }
}

customElements.define("note-form", NoteForm);
