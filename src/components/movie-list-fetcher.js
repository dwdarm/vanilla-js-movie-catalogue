import './movie-list';
import './pagination-nav';
import movieApi from '../api/movie';

class MovieListFetcher extends HTMLElement {
  connectedCallback() {
    this._movies = []
    this._section = this.getAttribute('type') || 'nowplaying';
    this._page = parseInt(this.getAttribute('page')) || 1;;
    this._pages = 1;
    
    this.loadMovies();
  }
  
  // fetch movie from API
  loadMovies() {
    this.renderLoading();
    movieApi[this._section]({ page: this._page })
      .then(res => res.json())
      .then(json => {
        this._movies = json.results;
        this._page = json.page;
        this._pages = json.total_pages;
        this.render();
      })
  }
  
  getTitle() {
    switch(this._section) {
      case 'popular':
        return 'Popular Movies';
      case 'upcoming':
        return 'Upcoming Movies';
      case 'toprated':
        return 'Top Rated Movies';
      default:
        return 'In Theater'
    }
  }
  
  // set router instance and get current base URL
  set router(router) {
    this._router = router;
    this._url = this._router.lastRouteResolved() ? 
      this._router.lastRouteResolved().url : undefined;
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
        <h1 class="title is-size-5-mobile">${this.getTitle()}</h1>
        <movie-list></movie-list>
        <pagination-nav 
          base-url="${this._url}"
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

customElements.define('movie-list-fetcher', MovieListFetcher);
