class Loading extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._shadowRoot.innerHTML = `
      <style>
        .loading {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 5rem 0;
        }
        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border-left-color: var(--color-4);
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      </style>

      <div class="loading">
        <div class="spinner"></div>
      </div>
    `;
  }
}

customElements.define("my-loading", Loading);
