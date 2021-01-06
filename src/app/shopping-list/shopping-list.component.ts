import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ingredient } from '../model/ingredient.model';
import { LoggingService } from '../services/logging.service';
import { ShoppingService } from '../services/shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  @Output() itemAdded = new EventEmitter<Ingredient>();
  @Output() itemEdited = new EventEmitter<Ingredient>();;

  ingredients: Ingredient[] | undefined

  constructor(private loggingService: LoggingService, private shoppingService : ShoppingService) { }

  ngOnInit(): void {
    this.ingredients=this.shoppingService.ingredients
  }

  onItemAdded(ingredient: Ingredient) {
   this.shoppingService.addIngredient(ingredient)
  }

  onItemEdited(ingredient: Ingredient) {
    this.loggingService.log("The item " + ingredient + " was edited, dude. Sincerly, your shopping-list.")
    this.itemEdited.emit(ingredient)
  }


}
