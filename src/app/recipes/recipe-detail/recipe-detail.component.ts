import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Recipe} from 'src/app/recipes/model/recipe.model';
import {DataService} from 'src/app/junk/services/data.service';
import {LoggingService} from 'src/app/shared/logging.service';
import {RecipeService} from 'src/app/recipes/recipe.service';
import {ShoppingService} from 'src/app/shopping-list/shopping.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  recipe: Recipe | undefined;
  id: number | undefined;

  dataServiceSubscription: Subscription | undefined;

  constructor(private dataService: DataService, private loggingService: LoggingService, private recipeService: RecipeService,
              private shoppingService: ShoppingService, private route: ActivatedRoute, private router: Router) {

    this.dataServiceSubscription = this.dataService.subject.subscribe((message: string) => this.reactToEventFromService(message));
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.id = +params.id;
        this.recipe = this.recipeService.recipes[this.id];
      }
    );
  }

  ngOnDestroy(): void {
    // The subscription could be destroyed here, but if we did that, it wouldn't do anything at all.
    // To show the effect (receive an event), we must switch to the shopping list and
    // therefore destroy this component.
    // this.dataServiceSubscription?.unsubscribe()
  }

  /**
   * This function is called, after the subject in dataService is emitted. This happens, when clicking the edit button in
   * shopping-edit-component.
   * @param message message
   */
  reactToEventFromService(message: string): void {
    this.loggingService.log(message);
    // alert(message)
  }

  addToShoppingList(): void {
    if (this.recipe === undefined) {
      return;
    }

    for (const ingredient of this.recipe.ingredients) {
      this.shoppingService.addIngredient(ingredient);
    }

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
    if (this.id !== undefined) {
      this.recipeService.recipes.splice(this.id, 1);
      this.router.navigate(['..'], {relativeTo: this.route});
    }

  }
}
