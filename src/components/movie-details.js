import './rating-stars';
import './movie-similiar-fetcher';
import movieApi from '../api/movie';

class MovieDetails extends HTMLElement {
  connectedCallback() {
    this._movieId = this.getAttribute('movie-id');
    this.loadMovie();
  }
  
  // fetch movie from API
  loadMovie() {
    this.renderLoading();
    movieApi.detail(this._movieId)
    .then(res => res.json())
    .then(json => {
      if (typeof json.status_code === 'number' && json.status_code !== 1) {
        return this.renderError(json.status_message);
      }
      
      this._movie = json;
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
  
  renderError(message) {
    this.innerHTML = `
    <div class="section">
      <div class="container">
        <div class="notification is-danger">
          <p class="has-text-centered">${message}</p>
        </div>
      </div>
    </div>
    `
  }

  render() {
    document.title = `${this._movie.title} | Movie`;
    
    this.innerHTML = `
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
          
            <div class="column is-narrow">
              <figure 
                class="image"
                style="border-radius:5px;">
                <img 
                  style="width:300px;border-radius:5px;margin:0 auto;"
                  src="https://image.tmdb.org/t/p/w300/${this._movie.poster_path}" 
                  alt="${this._movie.title}">
              </figure>
            </div>
            
            <div class="column">
            
              <h1 class="title">${this._movie.title}</h1>
              <h2 class="subtitle">${this._movie.tagline}</h2>
              
              <div class="columns">
                <div class="column">
                  <div class="columns is-mobile">
                    <div class="column is-narrow">
                      <rating-stars rating="${Math.round(this._movie.vote_average/2)}"></rating-stars>
                    </div>
                    <div class="column is-narrow">
                      <p class="has-text-weight-semibold">${this._movie.vote_average}/10</p>
                    </div>
                  </div>
                </div>
                <div class="column is-narrow">
                  <p class="has-text-grey has-text-weight-semibold">${this._movie.runtime} min | ${this._movie.spoken_languages[0].name} | ${this._movie.release_date}</p>
                </div>
              </div>
              
              <p class="title is-5 is-spaced" style="margin-top:3rem;">Synopsis</p>
              <p class="subtitle is-6">${this._movie.overview}</p>
              
              <p class="title is-5 is-spaced" style="margin-top:3rem;">Genres</p>
              <div class="tags genres-tags"></div>
              
            </div>
            
          </div>
        
        </div>
      </div>
    </section>
    `;
    
    let genresTags = '';
    this._movie.genres.forEach(genre => {
      genresTags += `
      <a 
        class="tag is-dark" 
        href="/${'genre/' + genre.name + '/' + genre.id}" data-navigo>
        ${genre.name}
      </a>
      `;
    });
    this.querySelector('.genres-tags').innerHTML = genresTags;
    
    this.innerHTML += `<movie-similiar-fetcher movie-id="${this._movieId}"></movie-similiar-fetcher>`;
    
    if (this._router) {
      this._router.updatePageLinks();
    }
  }
}

customElements.define('movie-details', MovieDetails);
