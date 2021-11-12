import { Recipe } from './recipe'
const JSONdb = require('simple-json-db')
const db = new JSONdb('./data/recipes.json')

// A post request should not contain an id.
export type RecipeCreationParams = Pick<Recipe, 'temp' | 'name' | 'time' | 'ingredients'>

export class RecipesService {
  public get(id: number | string | undefined): Recipe {
    let recipe = db.get(id)

    if (!recipe) {
      recipe = []
      const recipes = db.JSON()
      if (id !== undefined) {
        for (const key in recipes) {
          if (recipes[key].name === id) {
            recipe.push(recipes[key])
          }
        }
      } else {
        recipe = recipes
      }
    }
    return recipe
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
