// @ts-ignore
import icons from 'url:../../img/icons.svg'; // parcel 2

export default class View {
  /**
   * @typedef {Array.<import('../model').Recipe> | import('../model').Recipe } ViewData
   */

  /**
   * @type {ViewData}
   */
  _data;

  /**
   * @type {HTMLElement}
   */
  _parentElement;

  /**
   * @returns {string}
   */
  _generateMarkup() {
    throw new Error('Method "_generateMarkup" must be implemented in subclass');
  }

  /**
   * Render the received data
   * @param {ViewData} data
   */
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError('No recipe found !');

    this._data = data;

    const markup = this._generateMarkup();

    this._clear();

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
            <div class="spinner">
                <svg>
                <use href="${icons}#icon-loader"></use>
                </svg>
            </div> 
        `;

    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   *
   * @param {string} message
   */
  renderError(message) {
    const markup = `
      <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
    `;

    this._clear();

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   *
   * @param {string} message
   */
  renderMessage(message = '') {
    const markup = `
      <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
    `;

    this._clear();

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
