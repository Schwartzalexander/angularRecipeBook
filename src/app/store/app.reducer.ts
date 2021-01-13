import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromRecipes from '../recipes/store/recipes.reducer';
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
  recipes: fromRecipes.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer,
  recipes: fromRecipes.recipesReducer
};
//
// export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
//   const keys = ['shoppingList', 'auth', 'recipes'];
//   return localStorageSync({keys})(reducer);
// }
//
// export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
