import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Recipe} from 'src/app/recipes/model/recipe.model';
import {RecipesService} from 'src/app/recipes/recipes.service';
import {ShoppingService} from '../../shopping-list/shopping.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  recipesSubscription: Subscription | undefined;
  paramsSubscription: Subscription | undefined;

  recipe: Recipe | undefined;
  index: number | undefined;

  constructor(private recipesService: RecipesService, private activatedRoute: ActivatedRoute,
              private router: Router, private shoppingService: ShoppingService) {
  }

  ngOnInit(): void {
    // Retrieve selected index from activatedRoute params
    this.paramsSubscription = this.activatedRoute.params.subscribe(
      (params) => {
        const index = +params.id;
        if (index !== undefined)
          this.recipesService.selectRecipe(index);
      });

    this.recipesSubscription = this.recipesService.recipesObservable
      .subscribe((recipesState) => {
        this.index = recipesState.selectedIndex;
        if (this.index !== undefined)
          this.recipe = recipesState.recipes[this.index];
        else
          this.recipe = undefined;
      });

  }

  ngOnDestroy(): void {
    this.recipesService.stopEdit();
    this.recipesSubscription?.unsubscribe();
    this.paramsSubscription?.unsubscribe();
  }

  addToShoppingList(): void {
    if (this.recipe === undefined) {
      return;
    }
    this.shoppingService.addIngredients(this.recipe.ingredients);
    this.router.navigate(['/shoppingList']);
  }

  areThereIngredients(): boolean {
    if (this.recipe === undefined) {
      return false;
    }
    if (this.recipe.ingredients === undefined) {
      return false;
    }
    return this.recipe.ingredients.length > 0;
  }

  deleteRecipe(): void {
    if (this.index !== undefined) {
      this.recipesService.deleteRecipe(['/recipes']);
    }

  }
}
