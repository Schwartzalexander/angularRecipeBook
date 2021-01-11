import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Ingredient} from '../shared/model/ingredient.model';
import {Store} from '@ngrx/store';
import {addIngredient, addIngredients, deleteIngredient, startEdit, stopEdit, updateIngredient} from './store/shopping-list.actions';
import {State} from './store/shopping-list.reducer';
import * as fromApp from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  ingredientsObservable: Observable<State>;

  constructor(private store: Store<fromApp.AppState>) {
    this.ingredientsObservable = this.store.select('shoppingList');
  }

  addIngredient(ingredient: Ingredient): void {
    if (!ingredient)
      return;
    this.store.dispatch(addIngredient({ingredient}));
  }

  addIngredients(ingredients: Ingredient[]): void {
    if (!ingredients || ingredients.length < 0)
      return;
    this.store.dispatch(addIngredients({ingredients}));
  }

  deleteIngredient(): void {
    this.store.dispatch(deleteIngredient());
  }

  updateIngredient(ingredient: Ingredient): void {
    this.store.dispatch(updateIngredient({ingredient}));
  }

  startEdit(id: number): void {
    this.store.dispatch(startEdit({id}));
  }

  stopEdit(): void {
    this.store.dispatch(stopEdit());
  }
}
