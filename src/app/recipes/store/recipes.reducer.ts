import {Action, ActionReducer, createReducer, on} from '@ngrx/store';
import {addRecipe, deleteRecipe, selectRecipe, setRecipes, startEdit, stopEdit, updateRecipe} from './recipes.actions';
import {Recipe} from '../model/recipe.model';

export interface State {
  recipes: Recipe[];
  selectedIndex: number | undefined;
  editedIndex: number | undefined;

}

export const initialState: State = {
  recipes: [],
  selectedIndex: undefined,
  editedIndex: undefined
};

const reducer: ActionReducer<State, Action> = createReducer(
  initialState,
  on(setRecipes, (state, {recipes}) => {
    // Make an immutable copy. State changes must always be immutable by convention.
    const newState = {...state, recipes};
    console.log('setRecipes:');
    console.log(state);
    console.log(newState);
    return newState;
  }),
  on(selectRecipe, (state, {selectedIndex}) => {
    const newState = {...state, selectedIndex, editedIndex: undefined};
    console.log('selectRecipe:');
    console.log(state);
    console.log(newState);
    return newState;
  }),
  on(deleteRecipe, (state) => {
    const newState = {
      ...state,
      recipes: state.recipes.filter((element, selectedIndex) => state.selectedIndex !== selectedIndex),
      editedIndex: undefined,
      editedRecipe: undefined
    };
    console.log('deleteRecipe:');
    console.log(state);
    console.log(newState);
    return newState;
  }),
  on(startEdit, (state) => {
    const newState = {...state, editedIndex: state.selectedIndex};
    console.log('startEdit:');
    console.log(state);
    console.log(newState);
    return newState;
  }),
  on(stopEdit, (state) => {
    const newState = {...state, editedIndex: undefined};
    console.log('stopEdit:');
    console.log(state);
    console.log(newState);
    return newState;
  }),
  on(updateRecipe, (state, {recipe: recipe}) => {
    if (state.editedIndex === undefined) {
      console.error('Trying to update a recipe without assigning an editedIndex.');
      return {...state};
    }
    const updatedRecipes = [...state.recipes];
    updatedRecipes[state.editedIndex] = recipe;
    const newState = {...state, recipes: updatedRecipes, editedIndex: undefined};
    console.log('updateRecipe:');
    console.log(state);
    console.log(newState);
    return newState;
  }),
  on(addRecipe, (state, {recipe: recipe}) => {
    const updatedRecipes = [...state.recipes, recipe];
    const newState = {...state, recipes: updatedRecipes, editedIndex: undefined, selectRecipe: updatedRecipes.length - 1};
    console.log('addRecipe:');
    console.log(state);
    console.log(newState);
    return newState;
  }),
  )
;

export function recipesReducer(state: State | undefined, action: Action): State {
  return reducer(state, action);
}
