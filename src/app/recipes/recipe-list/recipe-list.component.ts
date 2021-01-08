import {Component, OnInit} from '@angular/core';
import {Recipe} from 'src/app/model/recipe.model';
import {LoggingService} from 'src/app/services/logging.service';
import {RecipeService} from 'src/app/services/recipe.service';

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
