import { Body, Controller, Get, Path, Post, Query, Route, SuccessResponse } from 'tsoa'
import { Recipe } from './recipe'
import { RecipesService, RecipeCreationParams } from './recipesService'

@Route('Recipes')
export class RecipesController extends Controller {
  @Get('{RecipeId}')
  public async getRecipe(@Path() RecipeId: number): Promise<Recipe> {
    return new RecipesService().get(RecipeId)
  }

  @Get('')
  public async getRecipeByName(@Query() name?: string): Promise<Recipe | Recipe[]> {
    return new RecipesService().get(name)
  }

  @SuccessResponse('201', 'Created')
  @Post()
  public async createRecipe(@Body() requestBody: RecipeCreationParams): Promise<Recipe> {
    this.setStatus(201)
    return new RecipesService().create(requestBody)
  }
}
