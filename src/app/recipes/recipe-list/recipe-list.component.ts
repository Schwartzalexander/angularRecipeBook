import { Component, EventEmitter, OnInit, Output } from '@angular/core'; 
import { Recipe } from 'src/app/model/recipe.model';
import { LoggingService } from 'src/app/services/logging.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe("Pfannkuchen", "Der beste Pfannkuchen der Welt", "https://image.brigitte.de/10912866/t/G_/v3/w960/r1/-/pfannkuchen.jpg"),
    new Recipe("Krabbenbrötchen", "Joghurt, Mayonnaise, Dill und einen Spritzer Zitrone mit der gepressten oder fein gehackten Knoblauchzehe vermischen. Mit einer Prise Salz, Pfeffer und Zucker abschmecken, dann 30 Minuten kühl stellen. Das Salatblatt in feine Streifen schneiden. Das Brötchen aufschneiden (evtl. etwas Teig aus der Mitte entfernen), die Unterseite zuerst mit dem Salat, dann mit den Krabben belegen, die Joghurtmischung darüber geben und mit der oberen Brötchenhälfte abdecken. Schmeckt besonders gut, wenn das Brötchen noch warm ist.", "https://img.chefkoch-cdn.de/rezepte/125521053780376/bilder/264439/crop-960x640/krabbenbroetchen.jpg"),
    new Recipe("Mettigel", "Lecker stachelig","https://img.chefkoch-cdn.de/rezepte/1229761228049609/bilder/778860/crop-960x640/party-mettigel.jpg")
  ]
  @Output('clickedRecipe') recipeEmitter = new EventEmitter<Recipe>();

  constructor(private loggingService: LoggingService) {}

  ngOnInit(): void {
  }

  recipeClicked(recipe: Recipe) {
    this.loggingService.log(recipe);
    this.recipeEmitter.emit(recipe)
  }
}
