import { Body, Controller, Get, Path, Post, Put, Delete, Query, Route, SuccessResponse } from 'tsoa'
import { Recipe } from './recipe'
import { RecipesService, RecipeCreationParams, RecipeUpdateParams } from './recipesService'

@Route('Recipes')
export class RecipesController extends Controller {
  @Get('{RecipeId}')
  public async getRecipe(@Path() RecipeId: number): Promise<Recipe> {
    return new RecipesService().get(RecipeId)
  }

  @Get('')
  public async getRecipeByName(@Query() title?: string): Promise<Recipe | Recipe[]> {
    return new RecipesService().getList(title)
  }

  @SuccessResponse('201', 'Created')
  @Post()
  public async createRecipe(@Body() requestBody: RecipeCreationParams): Promise<Recipe> {
    this.setStatus(201)
    return new RecipesService().create(requestBody)
  }

  @SuccessResponse('201', 'Updated')
  @Put('{RecipeId}')
  public async updateRecipe(
    @Path() RecipeId: number,
    @Body() requestBody: RecipeUpdateParams,
  ): Promise<Recipe> {
    console.log(requestBody, 'RecipeUpdateParams')
    this.setStatus(201)
    return new RecipesService().update(RecipeId, requestBody)
  }

  @SuccessResponse('201', 'Deleted')
  @Delete('{RecipeId}')
  public async deleteRecipe(@Path() RecipeId: number): Promise<boolean> {
    this.setStatus(201)
    return new RecipesService().delete(RecipeId)
  }
}
