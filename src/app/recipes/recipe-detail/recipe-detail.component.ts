import { Component, Input, OnInit } from '@angular/core'; 
import { Recipe } from 'src/app/model/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input('recipe') recipe: Recipe | undefined
  // constructor(recipe: Recipe) { this.recipe = recipe }

  ngOnInit(): void {
  }

}
