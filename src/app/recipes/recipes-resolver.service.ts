import {Injectable} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {Recipe} from './model/recipe.model';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {RecipesService} from './recipes.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private dataStorageService: DataStorageService, private recipesService: RecipesService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Recipe[] {
    // if (this.recipesService.recipes.length === 0)
    return this.dataStorageService.fetchRecipesObservable();
    // else
    //   return this.recipesService.recipes;
  }
}
