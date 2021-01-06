import { AfterContentInit, Component, ContentChild, ElementRef, EventEmitter } from '@angular/core';
import { Ingredient } from './model/ingredient.model';
import { LoggingService } from './services/logging.service';
import { ShoppingService } from './services/shopping.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit {

  lastAddedIngredient : Ingredient | undefined
  
  title = 'Angular Recipe Book';

  constructor(private loggingService: LoggingService, private shoppingService : ShoppingService) {}
  
  ngAfterContentInit() {
    this.shoppingService.ingredientAddedEventEmitter.subscribe(
      (ingredient : Ingredient) => {
        this.lastAddedIngredient = ingredient
      }
    )
  }
}

