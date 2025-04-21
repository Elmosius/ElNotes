class FooterBar extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._styleElement = document.createElement("style");
  }

  connectedCallback() {
    this.render();
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  _updateStyle() {
    this._styleElement.textContent = `
        :host {
            display: block;
            width: 100%;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .container {
            background-color: var(--color-4);
            padding: 1.2rem;
            display: flex;
            justify-content: space-between;
        }

        .copyright {
            width: 100%;
            text-align: center;
            font-size: 1rem;
            font-weight: 400;
            color: var(--color-white);
        }

        
    `;
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._styleElement);
    this._shadowRoot.innerHTML += `
        <div class="container">
            <p class="copyright">© 2025 Copyright by ElNotes (Notes App sederhana hehe)</p>
        </div>
      `;
  }
}

customElements.define("footer-bar", FooterBar);
