import { Recipe } from './recipe'
const JSONdb = require('simple-json-db')
const db = new JSONdb('./data/recipes.json')

// A post request should not contain an id.
export type RecipeCreationParams = Pick<Recipe, 'temp' | 'title' | 'time' | 'ingredients'>

export class RecipesService {
  public get(id: number | undefined): Recipe {
    const recipe = db.get(id)
    return recipe ? recipe : {}
  }

  public getList(name: string | undefined): Recipe {
    const recipeList = db.JSON()
    if (!name) {
      return recipeList
    }

    const filteredRecipes = recipeList.filter(recipe => recipes[key].name === id)
    return filteredRecipes
  }

  public create(RecipeCreationParams: RecipeCreationParams): Recipe {
    const id = Math.floor(Math.random() * 10000)
    const recipe = {
      id: id,
      ...RecipeCreationParams,
    }
    db.set(id, recipe)
    return recipe
  }
}
