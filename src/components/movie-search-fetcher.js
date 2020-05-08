import './movie-list';
import './pagination-nav';
import searchApi from '../api/search';

class MovieSearchFetcher extends HTMLElement {
  connectedCallback() {
    this._movies = []
    this._keyword = this.getAttribute('keyword');
    this._page = parseInt(this.getAttribute('page')) || 1;;
    this._pages = 1;
    
    document.title = `Search ${this._keyword} | Movie`;
    
    this.loadMovies();
  }
  
  // fetch movie from API
  loadMovies() {
    this.renderLoading();
    searchApi({ query: this._keyword, page: this._page })
      .then(res => res.json())
      .then(json => {
        this._movies = json.results;
        this._page = json.page;
        this._pages = json.total_pages;
        this.render();
      })
  }
  
  set router(router) {
    this._router = router;
  }
  
  renderLoading() {
    this.innerHTML = `
    <div class="section">
      <div class="container">
        <p class="has-text-centered">Loading...</p>
      </div>
    </div>
    `
  }

  render() {
    this.innerHTML = `
    <div class="section">
      <div class="container">
        <h1 class="title is-size-5-mobile">Search result for "${this._keyword}"</h1>
        <movie-list></movie-list>
        <pagination-nav 
          base-url="${'/search/' + this._keyword}"
          page="${this._page}"
          pages="${this._pages}">
        </pagination-nav>
      </div>
    </div>
    `
    document.querySelector('movie-list').movies = this._movies;
    if (this._router) {
      this._router.updatePageLinks();
    }
  }
}

customElements.define('movie-search-fetcher', MovieSearchFetcher);
