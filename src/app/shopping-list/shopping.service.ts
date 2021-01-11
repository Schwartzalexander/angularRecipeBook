import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Ingredient} from '../shared/model/ingredient.model';
import {Store} from '@ngrx/store';
import {addIngredient, addIngredients, deleteIngredient, startEdit, stopEdit, updateIngredient} from './store/shopping-list.actions';
import * as fromShoppingList from './store/shopping-list.reducer';
import {State} from './store/shopping-list.reducer';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  ingredientAddedSubject = new Subject<Ingredient>();

  clickOnIngredientSubject = new Subject<number>();
  ingredientsObservable: Observable<State>;

  constructor(private store: Store<fromShoppingList.AppState>) {
    this.ingredientsObservable = this.store.select('shoppingList');
  }

  addIngredient(ingredient: Ingredient): void {
    if (!ingredient)
      return;
    this.store.dispatch(addIngredient({ingredient}));
    this.ingredientAddedSubject.next(ingredient);
  }

  addIngredients(ingredients: Ingredient[]): void {
    if (!ingredients || ingredients.length < 0)
      return;
    this.store.dispatch(addIngredients({ingredients}));
    this.ingredientAddedSubject.next(ingredients[0]);
  }

  // deleteIngredientByInstance(ingredient: Ingredient): void {
  //   this.ingredientsObservable?.subscribe((ingredients) => {
  //     const index = ingredients.ingredients.indexOf(ingredient);
  //     this.deleteIngredientById(index);
  //   });
  // }

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
