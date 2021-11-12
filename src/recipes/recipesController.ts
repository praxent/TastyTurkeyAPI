import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
  Res,
  TsoaResponse,
} from 'tsoa'
import { Recipe } from './recipe'
import { RecipesService, RecipeCreationParams } from './recipesService'

@Route('Recipes')
export class RecipesController extends Controller {
  @Get('{RecipeId}')
  public async getRecipe(
    @Path() RecipeId: number,
    @Res() notFoundResponse: TsoaResponse<404, { reason: string }>,
  ): Promise<Recipe> {
    const recipe = new RecipesService().get(RecipeId)
    if (!recipe) {
      return notFoundResponse(404, { reason: 'RecipeId not found' })
    }
    return recipe
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
}
