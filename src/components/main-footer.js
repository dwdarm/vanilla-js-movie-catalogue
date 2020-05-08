import Logo from '../images/themoviedb-logo.svg';

class MainFooter extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <footer class="footer" style="padding:1.5rem">
      <div class="container">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <p class="subtitle is-7">Made with <span class="has-text-danger">♥</span> in Tangerang, Indonesia</p>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <figure class="image" style="width:150px">
                <img style="width:150px" src="${Logo}">
              </figure>
            </div>
          </div>
        </div>
      </div>
    </footer>
    `
  }
}

customElements.define('main-footer', MainFooter);
