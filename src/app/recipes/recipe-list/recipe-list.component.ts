import {Component, OnInit} from '@angular/core';
import {Recipe} from 'src/app/recipes/model/recipe.model';
import {LoggingService} from 'src/app/shared/logging.service';
import {RecipeService} from 'src/app/recipes/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] | undefined;
  filterTerm = '';

  constructor(private loggingService: LoggingService, private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.recipes;
  }

}
