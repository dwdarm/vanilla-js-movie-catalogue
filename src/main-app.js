import './pages/home-page';
import './pages/popular-page';
import './pages/upcoming-page';
import './pages/toprated-page';
import './pages/genre-page';
import './pages/details-page';
import './pages/search-page';
import Navigo from 'navigo';

class MainApp extends HTMLElement {
  constructor() {
    super();
    this._router = new Navigo(null, true, '#');
  }

  connectedCallback() {
    
    // init router's routes callback
    this._router
      .on({
        '/popular': (params, query) => this.setPage('popular-page', params, query),
        '/upcoming': (params, query) => this.setPage('upcoming-page', params, query),
        '/toprated': (params, query) => this.setPage('toprated-page', params, query),
        '/genre/:genre/:genreid': (params, query) => this.setPage('genre-page', params, query),
        '/movie/:id': (params, query) => this.setPage('details-page', params, query),
        '/search/:keyword': (params, query) => this.setPage('search-page', params, query),
        '*': (params, query) => this.setPage('home-page', params, query)
      })
      .resolve();
  }
  
  // change page
  setPage(page, params, query) {
    const pageNode = document.createElement(page);
    pageNode.router = this._router;
    pageNode.params = params;
    pageNode.query = query;
    this.innerHTML = '';
    this.appendChild(pageNode);
  }
}

customElements.define('main-app', MainApp);
