import './rating-stars';

class MovieItem extends HTMLElement {
  set movie(movie) {
    this._movie = movie;
    this.render();
  }

  render() {
    this.innerHTML = `
    <a href="/movie/${this._movie.id}" data-navigo>
    <article 
      class="card movie-card is-shadowless"
      style="border-radius:5px;"
      >
    
      <div class="card-image">
        <figure 
          class="image is-2by3 has-background-grey-lighter"
          style="border-radius:5px;">
          <img 
            class="has-ratio" 
            style="width:100%;border-radius:5px;"
            src="https://image.tmdb.org/t/p/w300/${this._movie.poster_path}" 
            alt="${this._movie.title}">
        </figure>
      </div>
    
      <div class="card-content has-text-centered">
        <p>
          ${this._movie.title}
        </p>
        <div class="level" style="margin-top:1rem;">
          <div class="level-item">
            <rating-stars rating="${Math.round(this._movie.vote_average/2)}"></rating-stars>
          </div>
        </div>
      </div>
      
    </article>
    </a>
    `
  }
}

customElements.define('movie-item', MovieItem);
