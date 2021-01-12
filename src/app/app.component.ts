import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Ingredient} from './shared/model/ingredient.model';
import {LoggingService} from './shared/logging.service';
import {ShoppingService} from './shopping-list/shopping.service';
import {AuthService} from './auth/auth.service';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  lastAddedIngredient: Ingredient | undefined;
  title = 'Angular Recipe Book';

  constructor(private loggingService: LoggingService, private shoppingService: ShoppingService,
              private authService: AuthService, @Inject(PLATFORM_ID) private platformId: any) {
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId))
      this.authService.autoLogin();
  }

}

