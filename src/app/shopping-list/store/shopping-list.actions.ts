import {createAction, props} from '@ngrx/store';
import {Ingredient} from '../../shared/model/ingredient.model';

export const addIngredient = createAction('[ShoppingList] Adding ingredient', props<{ ingredient: Ingredient }>());
export const addIngredients = createAction('[ShoppingList] Adding ingredients', props<{ ingredients: Ingredient[] }>());
export const updateIngredient = createAction('[ShoppingList] Updating ingredient', props<{ ingredient: Ingredient }>());
export const deleteIngredient = createAction('[ShoppingList] Deleting ingredient');
export const startEdit = createAction('[ShoppingList] Starting editing ingredient', props<{ id: number }>());
export const stopEdit = createAction('[ShoppingList] Stopping editing ingredient');
