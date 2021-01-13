import {Component, OnInit} from '@angular/core';
import {Ingredient} from './shared/model/ingredient.model';
import {LoggingService} from './shared/logging.service';
import {ShoppingService} from './shopping-list/shopping.service';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  lastAddedIngredient: Ingredient | undefined;
  title = 'Angular Recipe Book';

  constructor(private loggingService: LoggingService, private shoppingService: ShoppingService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.autoLogin();
    // this.rehydration.localStorageSyncReducer(this.store);
  }

}

