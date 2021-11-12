import { Recipe } from './recipe'
const JSONdb = require('simple-json-db')
const db = new JSONdb('./data/recipes.json')

// A post request should not contain an id.
export type RecipeCreationParams = Pick<Recipe, 'temp' | 'title' | 'time' | 'ingredients'>

export class RecipesService {
  public get(id: number | undefined): Recipe {
    const recipe = db.get(id)

    return recipe ? recipe : undefined
  }

  public getList(title: string | undefined): Recipe[] {
    const recipeList = db.JSON()
    const recipeArray: Recipe[] = Object.values(recipeList)

    if (!title) {
      return recipeArray
    }

    return recipeArray.filter((recipe: Recipe) => recipe.title === title)
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
