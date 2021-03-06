import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from 'src/app/recipes/model/recipe.model';
import {LoggingService} from 'src/app/shared/logging.service';
import {RecipesService} from 'src/app/recipes/recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
  // encapsulation: ViewEncapsulation.None
  // By default (ViewEncapsulation.Emulated), all elements within a component get are assigned an
  // attribute unique to that component e.g. _ngcontent-cmn-c17). Therefore, styles (defined in CSS) are only
  // assigned to elements within this component.
  // Setting ViewEncapsulation.None disables this behavior, i.e. elements don't get that attribute
  // and styles defined in the css file of this component apply for the complete app.
})
export class RecipeItemComponent implements OnInit {
  // @Input('recipe-item-awesome-binding-name') recipe: Recipe = new Recipe("Test", "Test",
  // "https://img.chefkoch-cdn.de/rezepte/1229761228049609/bilder/778860/crop-960x640/party-mettigel.jpg")
  @Input() recipe: Recipe | undefined;
  @Input() id: number | undefined;

  constructor(private recipesService: RecipesService, private loggingService: LoggingService) {
  }

  ngOnInit(): void {
  }

  counter(i: number): number[] {
    return new Array(i);
  }
}
