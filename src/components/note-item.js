import { formatDate } from "../assets/js/format-date.js";

class NoteItem extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._styleElement = document.createElement("style");
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ["id", "title", "body", "createdAt", "archived"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  _updateStyle() {
    this._styleElement.textContent = `
      .note-item {
        background-color: var(--color-2);
        padding: 1rem 1.2rem;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        margin-bottom: 10px;
        border-radius: 10px;
        transition: opacity 0.3s;
      }
      .note-item.archived {
        opacity: 0.5;
      }
      .note-item h2 {
        font-size: 1.3rem;
        margin-top: 0;
        font-weight: 600;
        overflow-wrap: break-word;
        word-break: break-word;
        white-space: normal;
      }
      .note-item p {
        font-size: 1rem;
        font-weight: 500;
        background-color: var(--color-3);
        padding: 10px;
        border-radius: 5px;
        overflow-wrap: break-word;
        word-break: break-word;
        white-space: normal;
      }
      .note-item small {
        font-weight: 500;
      }
      .note-item button {
        margin-top: 10px;
        padding: 5px 10px;
        font-size: 0.9rem;
        border: none;
        border-radius: 5px;
        background-color: var(--color-4);
        color: white;
        cursor: pointer;
      }
      .note-item button:hover {
        opacity: 0.8;
      }
    
      @media (max-width: 425px) {
        .note-item h2 {
          font-size: 1rem;
        }
        .note-item p {
          font-size: 0.8rem;
          padding: 5px;
        }
      }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  _toggleArchive() {
    const id = this.getAttribute("id");
    const currentArchived = this.getAttribute("archived") === "true";
    const newArchived = !currentArchived;
    const toggleEvent = new CustomEvent("toggle-archive", {
      detail: { id, archived: newArchived },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(toggleEvent);
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    const title = this.getAttribute("title");
    const body = this.getAttribute("body");
    const createdAt = this.getAttribute("createdAt");
    const archived = this.getAttribute("archived");
    const formattedDate = createdAt ? formatDate(createdAt) : "";

    const archivedClass = archived === "true" ? "archived" : "";

    this._shadowRoot.appendChild(this._styleElement);
    this._shadowRoot.innerHTML += `
      <div class="note-item ${archivedClass}">
        <h2>${title}</h2>
        <p>${body}</p>
        <small>Created At: ${formattedDate}</small><br/>
        <button class="toggle-archive">${archived === "true" ? "Unarchive" : "Archive"}</button>
      </div>
    `;

    const toggleButton = this._shadowRoot.querySelector(".toggle-archive");
    toggleButton.addEventListener("click", this._toggleArchive.bind(this));
  }
}

customElements.define("note-item", NoteItem);
