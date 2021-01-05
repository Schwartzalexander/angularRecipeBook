import { Component, OnInit } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { LoggingService } from '../services/logging.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  shownRecipe : Recipe | undefined

  constructor(private loggingService: LoggingService) {}

  ngOnInit(): void {
  }

  onRecipeClicked(recipe : Recipe) {
    this.loggingService.log(recipe);
    this.shownRecipe = recipe  
  }

}
