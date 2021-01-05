import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ingredient } from '../model/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  @Output() itemAdded = new EventEmitter<Ingredient>();
  @Output() itemEdited = new EventEmitter<Ingredient>();;

  ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Flour', 2),
    new Ingredient('Chicken', 1),
    new Ingredient('Fish dicks', 12)
  ]
  constructor() { }

  ngOnInit(): void {
  }

  onItemAdded(ingredient: Ingredient) {
    console.log("The item "+ingredient+" was added, dude. Sincerly, your shopping-list.")
    this.ingredients.push(ingredient)
    this.itemAdded.emit(ingredient)
  }

  onItemEdited(ingredient: Ingredient) {
    console.log("The item "+ingredient+" was edited, dude. Sincerly, your shopping-list.")
    this.itemEdited.emit(ingredient)
  }


}
