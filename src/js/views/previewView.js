import View from './view';
// @ts-ignore
import icons from 'url:../../img/icons.svg'; // parcel 2

class PreviewView extends View {
  /**
   * @type {import('../model').Recipe}
   */
  _data; // initialize _data as an array

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return `
    <li class="preview">
        <a class="preview__link ${
          this._data.id === id ? 'preview__link--active' : ''
        }" href="#${this._data.id}">
            <figure class="preview__fig">
            <img src="${this._data.image}" alt="${this._data.title}" />
            </figure>
            <div class="preview___data">
                <h4 class="preview__title">${this._data.title}</h4>
                <p class="preview__publisher">${this._data.publisher}</p>
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

export default new PreviewView();
