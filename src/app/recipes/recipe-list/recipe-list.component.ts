import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from 'src/app/recipes/model/recipe.model';
import {RecipesService} from 'src/app/recipes/recipes.service';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipesSubscription: Subscription;
  recipes: Recipe[] | undefined;
  filterTerm = '';

  constructor(private recipesService: RecipesService) {
    this.recipesSubscription = this.recipesService.recipesObservable
      .pipe(map((recipesState) => recipesState.recipes))
      .subscribe((recipes) => {
        this.recipes = recipes;
      });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.recipesSubscription.unsubscribe();
  }

}
