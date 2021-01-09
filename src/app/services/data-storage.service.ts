import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RecipeService} from './recipe.service';
import {Observable, Subject} from 'rxjs';
import {Recipe} from '../model/recipe.model';
import {exhaustMap, take, tap} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  url = 'https://recipe-book-f1337-default-rtdb.firebaseio.com/recipes.json';

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {
  }

  storeRecipes(recipesSuccessSubject?: Subject<any>, recipesErrorSubject?: Subject<any>): void {
    const recipes = this.recipeService.recipes;
    this.http.put(this.url, recipes).subscribe(response => {
        console.log(response);
        recipesSuccessSubject?.next(response);
      },
      response => {
        console.log(response);
        recipesErrorSubject?.next(response);
      },
    );
  }

  fetchRecipesObservable(): Observable<Recipe[]> {
    return this.authService.userSubject.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.get<Recipe[]>(this.url, {
          params: new HttpParams().set('auth', user !== null ? user.token : '')
        });
      }),
      tap(recipes => {
        // Clear the original array
        this.recipeService.recipes.length = 0;
        for (const recipe of recipes)
          this.recipeService.recipes.push(recipe);
      }));
  }

  fetchRecipes(): void {
    this.fetchRecipesObservable()
      // // // .pipe(map... is used to change the response
      // // .pipe(map((recipes: Recipe[]) => {
      // //   // array.map... is used to alter the elements of an array
      // //   recipes.map((recipe: Recipe) => {
      // //     if (!recipe.ingredients)
      // //       recipe.ingredients = [];
      // //     return recipe;
      // //   });
      // }))
      .subscribe();
  }
}
