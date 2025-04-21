import { attachHamburgerMenu } from "../assets/js/navbar.js";

class AppBar extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._styleElement = document.createElement("style");
    this._navElement = document.createElement("nav");
  }

  connectedCallback() {
    this.render();
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  _updateStyle() {
    this._styleElement.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :host {
            display: block;
            width: 100%;
        }

        .navbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: var(--color-4);
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            padding: 1.2rem 12rem;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 100; 
            width: 100%;    
        }

        .brand {
            color: #fff;
            text-decoration: none;
            font-size: 1.25rem;
            font-weight: 600;
        }

        .hamburger-menu {
            background: none;
            border: none;
            cursor: pointer;
            display: none; 
        }

        .hamburger-menu span {
            font-size: 1.5rem;
            color: #fff;
        }

        .nav-links {
            list-style: none;
            display: flex;
            align-items: center;
            gap: 2rem;
        }
        
        .nav-links li a {
            color: #fff;
            text-decoration: none;
            font-size: 1rem;
            font-weight: 500;
        }

        .nav-links li a:hover {
            color: #ddd;
        }

        /* Tablet  */
        @media (max-width: 992px) {
          .navbar {
              padding: 1rem 2rem;
              justify-content: space-between;
          }

          .nav-links {
              display: none;
              flex-direction: column;
              position: absolute;
              top: 100%;
              left: 0;
              width: 100%;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
              padding: 1rem;
              text-align: center;
              z-index: 100;
          }

          .nav-links.active {
              display: flex;
              background-color: var(--color-4);;
          }

          .nav-links li {
              margin: 0;
              padding: 0.5rem 0;
          }

          .hamburger-menu {
              display: block;
          }
        }
    `;
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._styleElement);
    this._navElement.classList.add("navbar");
    this._navElement.innerHTML = `
      <a href="index.html#" class="brand">ElNotes</a>
      
      <!-- Tombol hamburger menu -->
      <button class="hamburger-menu">
        <span class="material-symbols-outlined">menu</span>
      </button>
      
      <ul class="nav-links">
        <li><a href="#my-notes">My Notes</a></li>
        <li><a href="#my-notes-archived">Archived</a></li>
        <li><a href="#add-form">Create New Note</a></li>
      </ul>

    `;

    this._shadowRoot.appendChild(this._navElement);
    attachHamburgerMenu(this._navElement);
  }
}

customElements.define("app-bar", AppBar);
