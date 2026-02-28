class AppTable extends HTMLElement {
  static get observedAttributes() {
    return ['columns', 'data'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._columns = [];
    this._data = [];
  }

  get columns() {
    return this._columns;
  }

  set columns(value) {
    this._columns = Array.isArray(value) ? value : [];
    this._render();
  }

  get data() {
    return this._data;
  }

  set data(value) {
    this._data = Array.isArray(value) ? value : [];
    this._render();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'columns' && newVal) {
      try {
        this._columns = JSON.parse(newVal);
      } catch (_) {
        this._columns = [];
      }
      this._render();
    }
    if (name === 'data' && newVal) {
      try {
        this._data = JSON.parse(newVal);
      } catch (_) {
        this._data = [];
      }
      this._render();
    }
  }

  connectedCallback() {
    this._render();
  }

  _render() {
    if (!this.shadowRoot) return;
    const columns = this._columns.length ? this._columns : [];
    const data = this._data || [];
    const thead = columns.map(col => {
      const label = typeof col === 'object' && col !== null && 'label' in col ? col.label : col;
      return `<th>${escapeHtml(String(label))}</th>`;
    }).join('');
    const rows = data.map(row => {
      const cells = columns.map(col => {
        const key = typeof col === 'object' && col !== null && 'key' in col ? col.key : col;
        const value = row[key];
        return `<td>${escapeHtml(value != null ? String(value) : '')}</td>`;
      }).join('');
      return `<tr>${cells}</tr>`;
    }).join('');
    this.shadowRoot.innerHTML = `
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
          font-family: system-ui, sans-serif;
          font-size: 0.875rem;
        }
        th, td {
          padding: 0.5rem 0.75rem;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }
        th {
          font-weight: 600;
          color: #374151;
          background: #f9fafb;
        }
        tr:hover td {
          background: #f3f4f6;
        }
      </style>
      <table>
        <thead><tr>${thead}</tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

customElements.define('app-table', AppTable);
