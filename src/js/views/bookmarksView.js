import View from './view';
// @ts-ignore
import icons from 'url:../../img/icons.svg'; // parcel 2
import previewView from './previewView';

class BookmarksView extends View {
  /**
   * @type {Array<import('../model').Recipe>}
   */
  _data = []; // initialize _data as an array

  /**
   * @type {HTMLElement}
   */
  _parentElement = document.querySelector('.bookmarks__list');

  addHanlderRender(handler) {
    window.addEventListener('load', handler);
  }

  /**
   *
   * @returns {string}
   */
  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new BookmarksView();
