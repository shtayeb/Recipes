import 'core-js/stable'; // polyfill everything else
import 'regenerator-runtime/runtime'; // pollyfill async await

import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    // update result view to mark selected reciper
    resultsView.update(model.getSearchResultsPage());

    // 1 - Loading Recipe
    await model.loadRecipe(id);

    // 2 - Rendering Recipe
    recipeView.render(model.state.recipe);

    // update bookmark view
    bookmarksView.update(model.state.bookmarks);
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
    resultsView.render(model.getSearchResultsPage());

    // Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * @param {number} gotoPage
 */
const controlPagination = function (gotoPage) {
  resultsView.render(model.getSearchResultsPage(gotoPage));

  paginationView.render(model.state.search);
};

/**
 *
 * @param {number} newServings
 */
const controlServings = function (newServings) {
  // Update the recipe servings in state
  model.updateServings(newServings);
  // update the recipeView
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add or remove bookmark
  if (model.state.recipe.bookmarked) {
    model.deleteBookmark(model.state.recipe.id);
  } else {
    model.addBookmark(model.state.recipe);
  }

  // Update recipe view
  recipeView.update(model.state.recipe);

  // render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

/**
 *
 * @param {import('./model').Recipe} newRecipe
 */
const controlAddRecipe = async function (newRecipe) {
  try {
    // show loading spinner
    addRecipeView.renderSpinner();

    // upload the new recipe data
    await model.uploadRecipe(newRecipe);

    // render recipe
    recipeView.render(model.state.recipe);

    // display success message
    addRecipeView.renderMessage('Recipe added successfully !');

    // render the bookmark view
    bookmarksView.render(model.state.bookmarks);

    // change the id in the url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // close the modal
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, 2500);
  } catch (error) {
    addRecipeView.renderError(error.message);
  }
};

const init = function () {
  bookmarksView.addHanlderRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView._addHandlerUpload(controlAddRecipe);
};

init();
