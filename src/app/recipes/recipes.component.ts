import {Component, OnInit} from '@angular/core';
import {LoggingService} from '../shared/logging.service';
import {RecipeService} from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  constructor(private loggingService: LoggingService, private recipeService: RecipeService) {
  }

  ngOnInit(): void {
  }

}
