import '../components/nav-bar';
import '../components/main-footer';
import '../components/movie-details';

class DetailsPage extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  
  set router(router) {
    this._router = router;
  }
  
  set params(params) {
    this._params = params;
  }

  render() {
    const main = document.createElement('div');
    main.classList.add('main');
    
    const navBar = document.createElement('nav-bar');
    navBar.router = this._router;
    
    const mainContent = document.createElement('div');
    mainContent.classList.add('main-content');
    
    const movieDetails = document.createElement('movie-details');
    movieDetails.router = this._router;
    movieDetails.setAttribute('movie-id', this._params.id);
    mainContent.appendChild(movieDetails);
    
    const mainFooter = document.createElement('main-footer');
    
    main.appendChild(navBar);
    main.appendChild(mainContent);
    main.appendChild(mainFooter);
    
    this.innerHTML = '';
    this.appendChild(main);
  }
}

customElements.define('details-page', DetailsPage);
