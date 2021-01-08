import {Injectable} from '@angular/core';
import {DataStorageService} from './data-storage.service';
import {Recipe} from '../model/recipe.model';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {RecipeService} from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Recipe[] {
    if (this.recipeService.recipes.length === 0)
      return this.dataStorageService.fetchRecipesObservable();
    else
      return this.recipeService.recipes;
  }
}
