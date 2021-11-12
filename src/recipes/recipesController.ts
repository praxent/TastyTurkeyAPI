import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Put,
  Delete,
  Query,
  Route,
  SuccessResponse,
  Res,
  TsoaResponse,
  Response,
} from 'tsoa'
import { Recipe } from './recipe'
import { RecipesService, RecipeCreationParams, RecipeUpdateParams } from './recipesService'

interface ValidateErrorJSON {
  message: 'Validation failed'
  details: { [name: string]: unknown }
}

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

  @Response<ValidateErrorJSON>(422, 'Validation Failed')
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
