import View from './view';
// @ts-ignore
import icons from 'url:../../img/icons.svg'; // parcel 2

class ResultsView extends View {
  /**
   * @type {Array<import('../model').Recipe>}
   */
  _data = []; // initialize _data as an array

  /**
   * @type {HTMLElement}
   */
  _parentElement = document.querySelector('.results');

  /**
   *
   * @returns {string}
   */
  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  /**
   * @param {import('../model').Recipe} recipe
   * @returns {string}
   */
  _generateMarkupPreview(recipe) {
    const id = window.location.hash.slice(1);
    return `
    <li class="preview">
        <a class="preview__link ${
          recipe.id === id ? 'preview__link--active' : ''
        }" href="#${recipe.id}">
            <figure class="preview__fig">
            <img src="${recipe.image}" alt="${recipe.title}" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${recipe.title}</h4>
                <p class="preview__publisher">${recipe.publisher}</p>
                <!-- 
                <div class="preview__user-generated">
                    <svg>
                        <use href="${icons}#icon-user"></use>
                    </svg>
                </div>

                -->
            </div>
        </a>
    </li>
    `;
  }
}

export default new ResultsView();
