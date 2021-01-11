import {addIngredient, addIngredients, deleteIngredient, startEdit, stopEdit, updateIngredient} from './shopping-list.actions';
import {Action, ActionReducer, createReducer, on} from '@ngrx/store';
import {Ingredient} from '../../shared/model/ingredient.model';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient | undefined;
  editedIndex: number | undefined;
}

export const initialState: State = {
  ingredients: [],
  editedIngredient: undefined,
  editedIndex: undefined
};

const reducer: ActionReducer<State, Action> = createReducer(
  initialState,
  on(addIngredient, (state, {ingredient}) => {
    // Make an immutable copy. State changes must always be immutable by convention.
    const newState = {...state, ingredients: [...state.ingredients, ingredient]};
    console.log('addIngredient:');
    console.log(state);
    console.log(newState);
    return newState;
  }),
  on(addIngredients, (state, {ingredients}) => {
    const newState = {...state, ingredients: [...state.ingredients, ...ingredients]};
    console.log('addIngredients:');
    console.log(state);
    console.log(newState);
    return newState;
  }),
  on(updateIngredient, (state, {ingredient}) => {
    if (state.editedIndex === undefined) {
      console.error('Trying to update an ingredient without assigning an editedIndex.');
      return {...state};
    }
    const originalIngredient = state.ingredients[state.editedIndex];
    // console.log('originalIngredient:');
    // console.log(originalIngredient);
    const updatedIngredients = [...state.ingredients];
    updatedIngredients[state.editedIndex] = ingredient;
    // console.log('updatedIngredients:');
    // console.log(updatedIngredients);
    const newState = {...state, ingredients: updatedIngredients, editedIndex: undefined, editedIngredient: undefined};
    console.log('updateIngredient:');
    console.log(state);
    console.log(newState);
    return newState;
  }),
  on(deleteIngredient, (state) => {
    // return ({...state, ingredients: [...state.ingredients].splice(id, 1)});
    const newState = {
      ...state,
      ingredients: state.ingredients.filter((element, editedIndex) => state.editedIndex !== editedIndex),
      editedIndex: undefined,
      editedIngredient: undefined
    };
    console.log('deleteIngredient:');
    console.log(state);
    console.log(newState);
    return newState;
  }),
  on(startEdit, (state, {id}) => {
    const newState = {...state, editedIndex: id, editedIngredient: {...state.ingredients[id]}};
    console.log('startEdit:');
    console.log(state);
    console.log(newState);
    return newState;
  }),
  on(stopEdit, state => {
    const newState = {...state, editedIndex: undefined, editedIngredient: undefined};
    console.log('stopEdit:');
    console.log(state);
    console.log(newState);
    return newState;
  }),
);

export function shoppingListReducer(state: State | undefined, action: Action): State {
  return reducer(state, action);
}
