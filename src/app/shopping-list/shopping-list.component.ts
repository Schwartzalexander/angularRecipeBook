import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../model/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
ingredients : Ingredient[] = [
  new Ingredient('Apple', 5),
  new Ingredient('Flour', 2),
  new Ingredient('Chicken', 1),
  new Ingredient('Fish dicks', 12)
]
  constructor() { }

  ngOnInit(): void {
  }

}
