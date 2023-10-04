const API_KEY = '8244233a-6b08-4bc3-b939-ee8fb2a1410a';
const BASE_URL = `https://forkify-api.herokuapp.com/api/v2`;

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const res = await fetch(BASE_URL + `/recipes/${id}?key=${API_KEY}`);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}(${res.status})`);

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
    console.log(error);
  }
};
