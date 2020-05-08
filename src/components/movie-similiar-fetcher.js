import './movie-list';
import movieApi from '../api/movie';

class MovieSimiliarFetcher extends HTMLElement {
  connectedCallback() {
    this._movies = []
    this._movieId = this.getAttribute('movie-id');
  
    this.loadMovies();
  }
  
  // fetch movie from API
  loadMovies() {
    this.renderLoading();
    movieApi.similiar(this._movieId, { page: this._page })
      .then(res => res.json())
      .then(json => {
        this._movies = json.results;
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
        <h2 class="title is-4 is-size-5-mobile">Similiar Movies</h2>
        <movie-list></movie-list>
      </div>
    </div>
    `
    
    document.querySelector('movie-list').movies = this._movies;
    if (this._router) {
      this._router.updatePageLinks();
    }
  }
}

customElements.define('movie-similiar-fetcher', MovieSimiliarFetcher);
