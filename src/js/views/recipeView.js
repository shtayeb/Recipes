// @ts-ignore
import icons from 'url:../../img/icons.svg'; // parcel 2
// @ts-ignore
import { Fraction } from 'fractional';
import View from './view';

/**
 * @typedef {Object} Ingredient
 * @property {number} quantity - The quantity of the ingredient
 * @property {string} unit - The unit of the ingredient
 * @property {string} description - The description of the ingredient
 */
class RecipeView extends View {
  /**
   * @type {import('../model').Recipe}
   */
  _data; // initialize _data as an array

  /**
   * @type {HTMLElement}
   */
  _parentElement = document.querySelector('.recipe');

  /**
   * @param {(ev: SubmitEvent) => any} handler - The callback function to handle search
   */
  addHandlerRender(handler) {
    window.addEventListener('hashchange', handler);
    window.addEventListener('load', handler);
  }

  /**
   * @param {(newServings: Number) => any} handler - The callback function to handle updating the servings
   */
  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      // @ts-ignore
      const btn = e.target.closest('.btn--update-servings');

      if (!btn) return;

      const updateTo = +btn.dataset.updateTo;

      if (updateTo > 0) handler(updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();

      // @ts-ignore
      const btn = e.target.closest('.btn--bookmark');

      if (!btn) return;

      handler();
    });
  }

  /**
   *
   * @returns {string}
   */
  _generateMarkup() {
    return `
        <figure class="recipe__fig">
          <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this._data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this._data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--update-servings" data-update-to="${
                this._data.servings - 1
              }">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--update-servings" data-update-to="${
                this._data.servings + 1
              }">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">

          ${this._data.ingredients.map(this._generateIngMarkup).join('')}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this._data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
        
      `;
  }

  /**
   * @param {Ingredient} ing
   * @returns {string}
   */
  _generateIngMarkup(ing) {
    return `
        <li class="recipe__ingredient">
            <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${
              ing.quantity ? new Fraction(ing.quantity).toString() : ''
            }</div>
            <div class="recipe__description">
            <span class="recipe__unit">${ing.unit}</span>
            ${ing.description}
            </div>
        </li>
        `;
  }
}

export default new RecipeView();
