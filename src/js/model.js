import { API_KEY, API_URL, RESULTS_PER_PAGE } from './config';
import { getJson } from './helpers';

/**
 * @typedef {Object} Recipe
 * @property {string} id
 * @property {string} title
 * @property {string} publisher
 * @property {string} sourceUrl
 * @property {string} [image]
 * @property {number} [servings]
 * @property {number} [cookingTime]
 * @property {Array} [ingredients]
 * @property {boolean} [bookmarked]
 */

/**
 * @typedef {Object} Search
 * @property {string} query
 * @property {Array.<Recipe>} results
 * @property {number} resultsPerPage
 * @property {number} page
 */

export const state = {
  /**
   * @type {Recipe}
   */
  recipe: {
    id: '',
    title: '',
    publisher: '',
    sourceUrl: '',
    image: '',
    servings: 0,
    cookingTime: 0,
    ingredients: [],
  },

  /**
   * @type {Array.<Recipe>} bookmarks
   */
  bookmarks: [],

  /**
   * @type {Search}
   */
  search: {
    query: '',
    results: [],
    resultsPerPage: RESULTS_PER_PAGE,
    page: 1,
  },
};

/**
 * Load a single recipe using its id
 * @param {string} id
 */
export const loadRecipe = async function (id) {
  try {
    const data = await getJson(API_URL + `/recipes/${id}?key=${API_KEY}`);

    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    if (state.bookmarks.some(b => b.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }

    // console.log(state.recipe);
  } catch (error) {
    // console.log(`[Temp errors] ${error}`);
    throw error;
  }
};

/**
 * Load search results from the API
 * @param {string} query - The search query
 */
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await getJson(
      API_URL + `/recipes/?search=${query}?key=${API_KEY}`
    );

    state.search.results = data.data.recipes.map(rec => {
      /**
       * @type {Recipe}
       */
      let recipe = {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        sourceUrl: rec.source_url,
        image: rec.image_url,
      };
      return recipe;
    });

    state.search.page = 1;
  } catch (error) {
    throw error;
  }
};

/**
 *
 * @param {number} page
 * @returns {Array<Recipe>}
 */
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; // 0
  const end = page * state.search.resultsPerPage; // 9

  return state.search.results.slice(start, end);
};

/**
 *
 * @param {number} newServings
 */
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    // newQT = oldQT * newServings / oldServings
  });

  state.recipe.servings = newServings;
};

/**
 *
 * @param {Recipe} recipe
 */
export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);

  // mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }
};

/**
 *
 * @param {string} recipe
 */
export const deleteBookmark = function (recipe) {
  const index = state.bookmarks.findIndex(el => (el.id = recipe));
  state.bookmarks.splice(index, 1);

  if (recipe === state.recipe.id) {
    state.recipe.bookmarked = false;
  }
};
