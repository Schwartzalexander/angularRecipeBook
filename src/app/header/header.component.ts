import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoggingService} from '../shared/logging.service';
import {Subject, Subscription} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {map} from 'rxjs/operators';
import {RecipesService} from '../recipes/recipes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  recipesSuccessSubject: Subject<any> = new Subject<any>();
  recipesErrorSubject: Subject<any> = new Subject<any>();

  isAuthenticated = false;
  userSubject: Subscription | undefined;

  constructor(private loggingService: LoggingService, private authService: AuthService, private recipesService: RecipesService) {
  }

  ngOnInit(): void {
    this.userSubject = this.authService.authObservable.pipe(map(authState => {
      return authState.user;
    })).subscribe(user => {
      this.isAuthenticated = !!user; // Does the same as: = !user ? false : true;
    });
  }

  onSaveData(): void {

    this.recipesService.storeRecipes(this.recipesSuccessSubject, this.recipesErrorSubject);
    // If successful
    this.recipesSuccessSubject.subscribe((response) => {
      // show success message
      // ...
      this.recipesSuccessSubject.unsubscribe();
    });
    // If not successful
    this.recipesErrorSubject.subscribe((response) => {
      // show error message
      // ...
      this.recipesErrorSubject.unsubscribe();
    });
  }

  onFetchData(): void {
    this.recipesService.fetchRecipes();
  }

  ngOnDestroy(): void {
    this.recipesSuccessSubject.unsubscribe();
    this.recipesErrorSubject.unsubscribe();
    this.userSubject?.unsubscribe();
  }

  logout(): void {
    this.isAuthenticated = false;
    this.authService.logout();
  }
}
