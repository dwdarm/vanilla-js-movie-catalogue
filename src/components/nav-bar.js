import genresApi from '../api/genres';

class NavBar extends HTMLElement {
  constructor() {
    super();
    this._genres = []
    
    this.onSearch = this.onSearch.bind(this);
  }
  
  connectedCallback() {
    this.render();
    
    genresApi()
      .then(res => res.json())
      .then(json => {
        this._genres = json.genres;
        this.render();
      })
  }
  
  set router(router) {
    this._router = router;
    this._url = this._router.lastRouteResolved() ? 
      this._router.lastRouteResolved().url : undefined;
  }
  
  onBurgerClick(event) {
    event.preventDefault();
    event.target.classList.toggle('is-active');
    document.querySelector('.navbar-menu').classList.toggle('is-active');
  }
  
  onSearch() {
    const value = this.querySelector('.search-input').value;
    this._router.navigate(`/search/${value}`);
  } 

  render() {
    this.innerHTML = `
    <nav class="navbar is-link">
      <div class="container">

        <div class="navbar-brand">
        
          <a 
            class="navbar-item ${this._url === '/' || this._url === '' ? 'is-active' : ''}" 
            href="/" data-navigo>
            <span class="icon"><i class="fa fa-film"></i></span>
            <span>Movie</span>
          </a>
          
          <a 
            role="button" 
            class="navbar-burger burger" 
            aria-label="menu" 
            aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
          
        </div>

        <div class="navbar-menu">

          <div class="navbar-start">
            <div class="navbar-item">
              <div class="field has-addons">
                <div class="control">
                  <input 
                    class="input search-input" 
                    type="text" 
                    placeholder="Search for movies">
                </div>
                <div class="control">
                  <button 
                    class="button search-button">
                    <span class="icon"><i class="fa fa-search"></i></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div class="navbar-end">
          
            <a 
              class="navbar-item ${this._url === '/popular' || this._url === '//popular' ? 'is-active' : ''}" 
              href="/popular" data-navigo>
              <span class="icon"><i class="fa fa-heart"></i></span>
              <span>Popular</span>
            </a>
              
            <a 
              class="navbar-item ${this._url === '/upcoming' || this._url === '//upcoming' ? 'is-active' : ''}" 
              href="/upcoming" data-navigo>
              <span class="icon"><i class="fa fa-calendar"></i></span>
              <span>Upcoming</span>
            </a>
            
            <a 
              class="navbar-item ${this._url === '/toprated' || this._url === '//toprated' ? 'is-active' : ''}" 
              href="/toprated" data-navigo>
              <span class="icon"><i class="fa fa-star"></i></span>
              <span>Top rated</span>
            </a>
            
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                <span class="icon"><i class="fa fa-dot-circle-o"></i></span>
                <span>Genre</span>
              </a>
              <div class="navbar-dropdown"></div>
            </div>
            
          </div>

        </div>

      </div>
    </nav>
    `
    
    const dropdownMenu = this.querySelector('.navbar-dropdown');
    this._genres.forEach(genre => {
      dropdownMenu.innerHTML += `
      <a 
        class="navbar-item" 
        href="/${'genre/' + genre.name + '/' + genre.id}" data-navigo>
        <span class="icon"><i class="fa fa-dot-circle-o"></i></span>
        <span>${genre.name}</span>
      </a>`
    });
    
    this.querySelector('.navbar-burger')
      .addEventListener('click', this.onBurgerClick);
      
    this.querySelector('.search-input')
      .addEventListener('change', this.onSearch);
      
    this.querySelector('.search-button')
      .addEventListener('click', this.onSearch);
    
    if (this._router) {
      this._router.updatePageLinks();
    }
  }
}

customElements.define('nav-bar', NavBar);
