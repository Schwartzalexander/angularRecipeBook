import {HttpClient} from '@angular/common/http';
import {RecipesService} from '../recipes/recipes.service';
import {Subject} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';

const RECIPES_URL = environment.urlRecipes;

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipesService: RecipesService) {
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

}
