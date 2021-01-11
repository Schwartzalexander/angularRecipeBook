import {Action, createReducer, on} from '@ngrx/store';
import {User} from '../../junk/model/user.model';
import {login, logout} from './auth.actions';

export interface State {
  user: User | undefined;
}

export const initialState: State = {
  user: undefined
};

const reducer = createReducer(
  initialState,
  on(login, (state, {email, expirationTimestamp, token, userId}) => {
    // Make an immutable copy. State changes must always be immutable by convention.
    const user = new User(userId, '', email, '', '', [], '', token, expirationTimestamp);
    const newState = {...state, user};
    console.log('login:');
    console.log(state);
    console.log(newState);
    return newState;
  }),
  on(logout, (state) => {
    const newState = {...state, user: undefined};
    console.log('logout:');
    console.log(state);
    console.log(newState);
    return newState;
  }),
  // on(updateIngredient, (state, {ingredient}) => {
  //   if (state.editedIndex === undefined) {
  //     console.error('Trying to update an ingredient without assigning an editedIndex.');
  //     return {...state};
  //   }
  //   const originalIngredient = state.ingredients[state.editedIndex];
  //   // console.log('originalIngredient:');
  //   // console.log(originalIngredient);
  //   const updatedIngredients = [...state.ingredients];
  //   updatedIngredients[state.editedIndex] = ingredient;
  //   // console.log('updatedIngredients:');
  //   // console.log(updatedIngredients);
  //   const newState = {...state, ingredients: updatedIngredients, editedIndex: undefined, editedIngredient: undefined};
  //   console.log('updateIngredient:');
  //   console.log(state);
  //   console.log(newState);
  //   return newState;
  // }),
  // on(deleteIngredient, (state) => {
  //   // return ({...state, ingredients: [...state.ingredients].splice(id, 1)});
  //   const newState = {
  //     ...state,
  //     ingredients: state.ingredients.filter((element, editedIndex) => state.editedIndex !== editedIndex),
  //     editedIndex: undefined,
  //     editedIngredient: undefined
  //   };
  //   console.log('deleteIngredient:');
  //   console.log(state);
  //   console.log(newState);
  //   return newState;
  // }),
  // on(startEdit, (state, {id}) => {
  //   const newState = {...state, editedIndex: id, editedIngredient: {...state.ingredients[id]}};
  //   console.log('startEdit:');
  //   console.log(state);
  //   console.log(newState);
  //   return newState;
  // }),
  // on(stopEdit, state => {
  //   const newState = {...state, editedIndex: undefined, editedIngredient: undefined};
  //   console.log('stopEdit:');
  //   console.log(state);
  //   console.log(newState);
  //   return newState;
  // }),
);

// tslint:disable-next-line:typedef
export function authReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
