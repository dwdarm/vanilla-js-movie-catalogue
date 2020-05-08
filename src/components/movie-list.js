import './movie-item';

class MovieList extends HTMLElement {
  constructor() {
    super();
    this._movies = []
  }

  connectedCallback() {
    this.render();
  }

  set movies(movies = []) {
    this._movies = movies;
    this.render();
  }

  render() {
    const columns = document.createElement('div');
    columns.classList.add('columns', 'is-multiline', 'is-mobile');

    this._movies.forEach(movie => {
      const item = document.createElement('movie-item');
      item.classList.add('column', 'is-6-mobile', 'is-3-tablet');
      item.movie = movie;

      columns.appendChild(item);
    });

    this.innerHTML = '';
    this.appendChild(columns);
  }
}

customElements.define('movie-list', MovieList);
