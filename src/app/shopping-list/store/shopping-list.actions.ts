import {createAction, props} from '@ngrx/store';
import {Ingredient} from '../../shared/model/ingredient.model';

export const addIngredient = createAction('Adding ingredient', props<{ ingredient: Ingredient }>());
export const addIngredients = createAction('Adding ingredients', props<{ ingredients: Ingredient[] }>());
export const updateIngredient = createAction('Updating ingredient', props<{ ingredient: Ingredient }>());
export const deleteIngredient = createAction('Deleting ingredient');
export const startEdit = createAction('Starting editing ingredient', props<{ id: number }>());
export const stopEdit = createAction('Stopping editing ingredient');
