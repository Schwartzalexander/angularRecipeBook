import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../model/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Flour', 2),
    new Ingredient('Chicken', 1),
    new Ingredient('Fish dicks', 12)
  ]

  ingredientAddedEventEmitter = new EventEmitter<Ingredient>()

  constructor() { }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient)
    this.ingredientAddedEventEmitter.emit(ingredient)
  }

  deleteIngredient(ingredient: Ingredient) {
    let index = this.ingredients.indexOf(ingredient)
    this.ingredients.splice(index, 1)
  }

}
