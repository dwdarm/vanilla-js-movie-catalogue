import '../components/nav-bar';
import '../components/main-footer';
import '../components/movie-list-fetcher';

class popularPage extends HTMLElement {
  constructor() {
    super();
    this._page = 1;
  }
  
  connectedCallback() {
    document.title = "Popular | Movie";
    this.render();
  }
  
  set router(router) {
    this._router = router;
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
    
    const movieListFetcher = document.createElement('movie-list-fetcher');
    movieListFetcher.router = this._router;
    movieListFetcher.setAttribute('type', 'popular');
    movieListFetcher.setAttribute('page', this._page);
    mainContent.appendChild(movieListFetcher);
    
    const mainFooter = document.createElement('main-footer');
    
    main.appendChild(navBar);
    main.appendChild(mainContent);
    main.appendChild(mainFooter);
    
    this.innerHTML = '';
    this.appendChild(main);
  }
}

customElements.define('popular-page', popularPage);
