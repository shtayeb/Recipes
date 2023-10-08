import View from './view';
// @ts-ignore
import icons from 'url:../../img/icons.svg'; // parcel 2

class AddRecipeView extends View {
  /**
   * @type {import('../model').Search}
   */
  _data; // initialize _data as an array

  /**
   * @type {HTMLElement}
   */
  _parentElement = document.querySelector('.upload');

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();

    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      // @ts-ignore
      const dataArray = [...new FormData(this)];

      // @ts-ignore
      const data = Object.fromEntries(dataArray);
      handler(data);
    });
  }

  /**
   *
   * @returns {string}
   */
  _generateMarkup() {
    return ``;
  }
}

export default new AddRecipeView();
