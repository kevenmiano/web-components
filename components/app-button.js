class AppButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const label = this.getAttribute('label') || this.textContent.trim() || 'Button';
    this.shadowRoot.innerHTML = `
      <style>
        button {
          font-family: system-ui, sans-serif;
          font-size: 1rem;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 8px;
          background: #2563eb;
          color: #fff;
          cursor: pointer;
        }
        button:hover {
          background: #1d4ed8;
        }
      </style>
      <button>${label}</button>
    `;
    this.shadowRoot.querySelector('button').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('button-click', {
        detail: { label },
        bubbles: true,
        composed: true
      }));
      console.log("INSIDE shadow DOM");
    });
  }
}

customElements.define('app-button', AppButton);
