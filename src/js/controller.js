
import 'core-js/stable' // polyfill everything else
import 'regenerator-runtime/runtime' // pollufill async await

import * as model from './model'
import recipeView from './views/recipeView'

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2
// 8244233a-6b08-4bc3-b939-ee8fb2a1410a
///////////////////////////////////////
// https://forkify-api.herokuapp.com/api/v2/recipes/:id

const controlRecipes = async function(){
  try {
    const id = window.location.hash.slice(1)

    if(!id) return

    recipeView.renderSpinner()
    
    // 1 - Loading Recipe
    await model.loadRecipe(id)

    // 2 - Rendering Recipe
    recipeView.render(model.state.recipe)

  } catch (error) {
    console.log(error)
  }
}


// /#[uuid] - we can listen to change of the hash
// 5ed6604591c37cdc054bce89

window.addEventListener('hashchange',controlRecipes)
window.addEventListener('load',controlRecipes)

// const eventsName = ['hashChange','load']
// eventsName.forEach(ev => window.addEventListener(ev,controlRecipes) );