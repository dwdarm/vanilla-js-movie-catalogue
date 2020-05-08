import '../components/nav-bar';
import '../components/main-footer';
import '../components/movie-genre-fetcher';

class GenrePage extends HTMLElement {
  constructor() {
    super();
    this._page = 1;
  }
  
  connectedCallback() {
    this.render();
  }
  
  set router(router) {
    this._router = router;
  }
  
  set params(params) {
    this._params = params;
  }
  
  set query(query) {
    // parse query
    const searchParams = new URLSearchParams(query);
    this._page = parseInt(searchParams.get("page")) || 1;
  }

  render() {
    const main = document.createElement('div');
    main.classList.add('main');
    
    const navBar = document.createElement('nav-bar');
    navBar.router = this._router;
    
    const mainContent = document.createElement('div');
    mainContent.classList.add('main-content');
    
    const movieGenreFetcher = document.createElement('movie-genre-fetcher');
    movieGenreFetcher.router = this._router;
    movieGenreFetcher.setAttribute('genre', this._params.genre);
    movieGenreFetcher.setAttribute('genreid', this._params.genreid);
    movieGenreFetcher.setAttribute('page', this._page);
    mainContent.appendChild(movieGenreFetcher);
    
    const mainFooter = document.createElement('main-footer');
    
    main.appendChild(navBar);
    main.appendChild(mainContent);
    main.appendChild(mainFooter);
    
    this.innerHTML = '';
    this.appendChild(main);
  }
}

customElements.define('genre-page', GenrePage);
