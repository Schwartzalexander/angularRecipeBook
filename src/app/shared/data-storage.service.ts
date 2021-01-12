import {HttpClient} from '@angular/common/http';
import {RecipesService} from '../recipes/recipes.service';
import {Observable, Subject} from 'rxjs';
import {Recipe} from '../recipes/model/recipe.model';
import {map, tap} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';

const RECIPES_URL = environment.urlRecipes;

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipesService: RecipesService, private authService: AuthService) {
  }

  storeRecipes(recipesSuccessSubject?: Subject<any>, recipesErrorSubject?: Subject<any>): void {
    this.recipesService.recipesObservable.pipe(
      map((recipesState => recipesState.recipes)),
      tap((recipes) => {
        this.http.put(RECIPES_URL, recipes).subscribe(response => {
            console.log(response);
            recipesSuccessSubject?.next(response);
          },
          response => {
            console.log(response);
            recipesErrorSubject?.next(response);
          },
        );
      })
    );
  }

  fetchRecipesObservable(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(RECIPES_URL).pipe(
      tap(recipes => {
        this.recipesService.dispatchRecipes(recipes);
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
