import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromRecipes from '../recipes/store/recipes.reducer';
import * as fromHydration from './hydration/hydration.reducer';
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
  recipes: fromRecipes.State;
  hydration: fromHydration.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer,
  recipes: fromRecipes.recipesReducer,
  hydration: fromHydration.hydrationMetaReducer
};
