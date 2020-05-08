class RatingStars extends HTMLElement {
  constructor() {
    super();
    this._rating = parseInt(this.getAttribute('rating')) || 0;
    this.render();
  }

  render() {
    let stars = `<div class="columns is-mobile is-gapless">`;
    
    for (let i = 1; i <= 5; i++) {
      stars += `
      <div class="column is-narrow">
        <span class="icon ${i <= this._rating ? 'has-text-warning' : ''}">
          <i class="fa fa-star"></i>
        </span>
      </div>`;
    }
    
    stars += `</div>`;
    this.innerHTML = stars;
  }
}

customElements.define('rating-stars', RatingStars);
