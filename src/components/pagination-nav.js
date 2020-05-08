const range = (start, end) => {
  let result = []
  for (let i = start; i < end; i++) {
    result.push(i);
  }

  return result;
}

const computePagination = (page, pages) => {
  if (pages <= 10) {
    return range(1, pages + 1);
  }

  if (page < 6) {
    return range(1, 11);
  }

  if ((page + 5) > pages) {
    return range(pages - 9, pages + 1);
  }

  return range(page - 4, page + 6);
}

class PaginationNav extends HTMLElement {
  constructor() {
    super();
    this._page = parseInt(this.getAttribute('page')) || 1;
    this._pages = parseInt(this.getAttribute('pages')) || 1;
    this._baseUrl = this.getAttribute('base-url') || '';
  }
  
  connectedCallback() {
    this.render();
  }

  render() {
    let pagination = `<nav class="pagination is-centered" role="navigation" style="margin-top:3rem;">`;
    
    // Previous link
    if (this._page > 1) {
      pagination += `
      <a 
        class="pagination-previous"
        href="${this._baseUrl + '?page=' + (this._page - 1) }"
        data-navigo>
        Previous
      </a>`;
    }
    
    // Next link
    if (this._page < this._pages) {
      pagination += `
      <a 
        class="pagination-next"
        href="${this._baseUrl + '?page=' + (this._page + 1) }"
        data-navigo>
        Next
      </a>`;
    }
    
    pagination += `<ul class="pagination-list">`;
    
    // First link
    pagination += `
    <li>
      <a 
        class="pagination-link"
        href="${this._baseUrl + '?page=1'}"
        data-navigo>
        First
      </a>
    </li>`;
    
    computePagination(this._page, this._pages).forEach(i => {
      pagination += `
      <li>
        <a 
          class="pagination-link ${this._page === i ? 'is-current' : ''}"
          href="${this._baseUrl + '?page=' + (i) }"
          data-navigo>
          ${i}
        </a>
      </li>
      `
    });
    
    // Last link
    pagination += `
    <li>
      <a 
        class="pagination-link"
        href="${this._baseUrl + '?page=' + (this._pages) }"
        data-navigo>
        Last
      </a>
    </li>`;
    
    
    pagination += `</ul>`;
    pagination += `</nav>`;
    
    this.innerHTML = pagination;
  }
}

customElements.define('pagination-nav', PaginationNav);
