import { Component, OnInit } from '@angular/core';
import { Recipe } from '../model/recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  shownRecipe : Recipe | undefined

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeClicked(recipe : Recipe) {
    console.log(recipe);
    this.shownRecipe = recipe  
  }

}
