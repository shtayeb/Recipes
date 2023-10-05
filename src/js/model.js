import { API_KEY,API_URL } from "./config";
import { getJson } from "./helpers";

export const state = {
  recipe: {},
};

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

    console.log(state.recipe);
  } catch (error) {
    // console.log(`[Temp errors] ${error}`);
    throw error
  }
};
