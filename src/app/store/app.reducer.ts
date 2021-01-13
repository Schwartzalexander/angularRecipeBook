import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromRecipes from '../recipes/store/recipes.reducer';
import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';
import {localStorageSync} from 'ngrx-store-localstorage';

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

/**
 * Writes the specified store data into the local session storage and retrieves it on app start. Therefore, the state survives a browser refresh.
 * @see https://github.com/btroncone/ngrx-store-localstorage
 * @param reducer reducer
 */
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  const keys = ['shoppingList', 'auth', 'recipes'];
  return localStorageSync({keys, rehydrate: true, storage: sessionStorage})(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

