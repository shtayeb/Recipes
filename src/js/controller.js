import 'core-js/stable'; // polyfill everything else
import 'regenerator-runtime/runtime'; // pollyfill async await

import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    // 1 - Loading Recipe
    await model.loadRecipe(id);

    // 2 - Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    // console.log(error)
    recipeView.renderError(error);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();

    if (!query) return;

    await model.loadSearchResults(query);

    // render results

    resultsView.render(model.state.search.results);
  } catch (error) {
    console.log(error);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
