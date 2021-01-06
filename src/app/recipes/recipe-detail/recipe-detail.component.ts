import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/model/recipe.model';
import { DataService } from 'src/app/services/data.service';
import { LoggingService } from 'src/app/services/logging.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe | undefined
  id : number | undefined

  constructor(private dataService: DataService, private loggingService: LoggingService, private recipeService: RecipeService, private shoppingService: ShoppingService, private activeRoute: ActivatedRoute) {

    this.dataService.eventEmitter.subscribe((message: string) => this.reactToEventFromService(message))
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      (params) => {
        this.id = +params['id']
        this.recipe = this.recipeService.recipes[this.id]
      }
    )
  }

  /**
   * This function is called, after the eventEmitter in dataService is emitted. This happens, when clicking the edit button in shopping-edit-component.
   * @param message 
   */
  reactToEventFromService(message: string) {
    this.loggingService.log(message)
    //alert(message)
  }

  addToShoppingList() {
    if (this.recipe === undefined)
      return

    for (let ingredient of this.recipe.ingredients) {
      this.shoppingService.addIngredient(ingredient)
    }

  }

  areThereIngredients() {
    if (this.recipe === undefined)
      return false
    if (this.recipe.ingredients === undefined)
      return false
    return this.recipe.ingredients.length > 0
  }
}
