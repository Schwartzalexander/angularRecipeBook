import {Component} from '@angular/core';
import {Ingredient} from './model/ingredient.model';
import {LoggingService} from './services/logging.service';
import {ShoppingService} from './services/shopping.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  lastAddedIngredient: Ingredient | undefined;
  title = 'Angular Recipe Book';

  constructor(private loggingService: LoggingService, private shoppingService: ShoppingService) {
  }

}

