import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Ingredient} from '../model/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Flour', 2),
    new Ingredient('Chicken', 1),
    new Ingredient('Fish dicks', 12)
  ];

  ingredientAddedSubject = new Subject<Ingredient>();

  clickOnIngredientSubject = new Subject<number>();

  constructor() {
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientAddedSubject.next(ingredient);
  }

  deleteIngredient(ingredient: Ingredient): void {
    const index = this.ingredients.indexOf(ingredient);
    this.ingredients.splice(index, 1);
  }

}
