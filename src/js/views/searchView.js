class SearchView {
  /**
   * @type {HTMLElement}
   */
  _parentEl = document.querySelector('.search');

  /**
   * Get the input value from search
   * @returns {string}
   */
  getQuery() {
    /**
     * @type {HTMLInputElement}
     */
    const searchInput = this._parentEl.querySelector('.search__field');
    const query = searchInput.value;

    this._clearInput();

    return query;
  }

  /**
   * @param {Function} handler - The callback function to handle search
   */
  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();

      handler();
    });
  }

  _clearInput() {
    /**
     * @type {HTMLInputElement}
     */
    (this._parentEl.querySelector('.search__field')).value = '';
  }
}

export default new SearchView();
