import { API_KEY, API_URL } from './config';
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
 */

/**
 * @typedef {Object} Search
 * @property {string} query
 * @property {Array.<Recipe>} results
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
   * @type {Search}
   */
  search: {
    query: '',
    results: [],
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

    console.log(data);
  } catch (error) {
    throw error;
  }
};
