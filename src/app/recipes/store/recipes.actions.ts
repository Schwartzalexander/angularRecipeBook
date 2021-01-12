import {createAction, props} from '@ngrx/store';
import {Recipe} from '../model/recipe.model';

export const fetchRecipes = createAction('[Recipes] Fetch recipes');
export const setRecipes = createAction('[Recipes] Set recipes', props<{ recipes: Recipe[] }>());
export const selectRecipe = createAction('[Recipes] Select recipe', props<{ selectedIndex: number }>());
export const deleteRecipe = createAction('[Recipes] Delete recipe', props<{ redirectUrl?: string[] }>());
export const addRecipe = createAction('[Recipes] Add recipe', props<{ recipe: Recipe, redirectUrl?: string[] }>());
export const updateRecipe = createAction('[Recipes] Update recipe', props<{ recipe: Recipe, redirectUrl?: string[] }>());
export const startEdit = createAction('[Recipes] Starting editing recipe');
export const stopEdit = createAction('[Recipes] Stopping editing recipe', props<{ redirectUrl?: string[] }>());
