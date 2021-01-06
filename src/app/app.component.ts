import { AfterContentInit, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from './model/ingredient.model';
import { LoggingService } from './services/logging.service';
import { ShoppingService } from './services/shopping.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit, OnDestroy {

  lastAddedIngredient: Ingredient | undefined

  ingredientAddedSubscription: Subscription | undefined

  title = 'Angular Recipe Book';

  constructor(private loggingService: LoggingService, private shoppingService: ShoppingService) { }

  ngAfterContentInit() {
    this.ingredientAddedSubscription = this.shoppingService.ingredientAddedSubject.subscribe(
      (ingredient: Ingredient) => {
        this.lastAddedIngredient = ingredient
      }
    )
  }

  ngOnDestroy() {
    this.ingredientAddedSubscription?.unsubscribe
  }
}

