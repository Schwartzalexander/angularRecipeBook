import { Component, OnInit } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { LoggingService } from '../services/logging.service';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  shownRecipe : Recipe | undefined

  constructor(private loggingService: LoggingService, private recipeService : RecipeService) {}

  ngOnInit(): void {
    this.recipeService.recipeSelectionEventEmitter.subscribe(
      (recipe : Recipe) => {
        this.shownRecipe = recipe
      }
    )
  }

}
