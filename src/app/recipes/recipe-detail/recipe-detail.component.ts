import { Component, OnInit } from '@angular/core'; 
import { Recipe } from 'src/app/model/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe = new Recipe("Test", "Test", "https://img.chefkoch-cdn.de/rezepte/1229761228049609/bilder/778860/crop-960x640/party-mettigel.jpg")
  // constructor(recipe: Recipe) { this.recipe = recipe }

  ngOnInit(): void {
  }

}
