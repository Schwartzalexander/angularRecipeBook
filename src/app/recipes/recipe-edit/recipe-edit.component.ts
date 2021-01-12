import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Recipe} from 'src/app/recipes/model/recipe.model';
import {RecipesService} from 'src/app/recipes/recipes.service';
import {Ingredient} from '../../shared/model/ingredient.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  editedIndex: number | undefined;
  editMode = false;
  recipe: Recipe | undefined;
  recipeForm: FormGroup | undefined;
  nextIndex: number | undefined;

  recipesSubscription: Subscription | undefined;
  paramsSubscription: Subscription | undefined;

  // select options
  poisonLevelOptions = [
    {name: 'Not poisonous', value: 0},
    {name: 'A little', value: 1},
    {name: 'Only to my enemies', value: 2},
    {name: 'Deadly on sight', value: 3}];
  // radio options
  ratingOptions = [
    {name: '1 star', value: 1},
    {name: '2 star', value: 2},
    {name: '3 star', value: 3},
    {name: '4 star', value: 4},
    {name: '5 star', value: 5}];

  // Default values
  defaultName = 'Krautknödel';
  defaultDescription = 'Nur für echte Deutsche. Alle anderen furzen vom Kraut.';
  defaultImagePath = 'https://ais.kochbar.de/kbrezept/109581_1009663/1200x1200/rumaenische-krautwickel-sarmale-rezept-bild-nr-2.jpg';
  defaultPoisonLevel = this.poisonLevelOptions[2].value;
  defaultRating = this.ratingOptions[4].value;

  // Two-way-bound values
  descriptionValue: string | undefined = this.defaultDescription;

  constructor(private activatedRoute: ActivatedRoute, private recipesService: RecipesService, private router: Router) {
  }

  ngOnInit(): void {
    this.recipesSubscription = this.recipesService.recipesObservable.subscribe((recipesState) => {
      this.editedIndex = recipesState.editedIndex;
      this.nextIndex = recipesState.recipes.length;
      if (recipesState.editedIndex !== undefined) {
        this.editMode = recipesState.editedIndex !== undefined;
        this.recipe = recipesState.recipes[recipesState.editedIndex];
      } else {
        this.editMode = false;
        this.recipe = undefined;
      }
      this.recipeForm = this.createForm();
    });

    // Retrieve index from route params
    this.paramsSubscription = this.activatedRoute.params.subscribe(
      (params) => {
        const index = +params.id;
        if (index > -1)
          this.recipesService.startEdit();
        else
          this.recipesService.stopEdit();
      });
  }

  ngOnDestroy(): void {
    this.recipesService.stopEdit();
    this.recipesSubscription?.unsubscribe();
    this.paramsSubscription?.unsubscribe();
  }

  createForm(): FormGroup {
    let name = this.defaultName;
    let imagePath = this.defaultImagePath;
    let description = this.defaultDescription;
    let rating = this.defaultRating;
    let poisonLevel = this.defaultPoisonLevel;
    const ingredientsFormArray = new FormArray([]);

    if (this.editMode && this.editedIndex !== undefined && this.recipe !== undefined) {
      name = this.recipe.name;
      imagePath = this.recipe.imagePath;
      description = this.recipe.description;
      rating = this.recipe.rating;
      poisonLevel = this.recipe.poisonLevel;

      if (this.recipe.ingredients)
        for (const ingredient of this.recipe.ingredients) {
          ingredientsFormArray.push(
            new FormGroup({
                name: new FormControl(ingredient.name, Validators.required),
                amount: new FormControl((ingredient.amount), [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')])
              }
            )
          );
        }
    }

    const formGroup = new FormGroup({
      name: new FormControl(name, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      description: new FormControl(description, [Validators.required, Validators.maxLength(10000)]),
      rating: new FormControl(rating, [Validators.required, Validators.minLength(8)]),
      poisonLevel: new FormControl(poisonLevel, Validators.required),
      ingredients: ingredientsFormArray
    });
    return formGroup;
  }

  onSubmit(): void {
    console.log(this.recipeForm);
    const name = this.recipeForm?.value.name;
    const description = this.recipeForm?.value.description;
    const imagePath = this.recipeForm?.value.imagePath;
    const poisonLevel = this.recipeForm?.value.poisonLevel;
    const rating = this.recipeForm?.value.rating;
    const ingredientsData: { name: string, amount: number }[] = this.recipeForm?.value.ingredients;
    const ingredients: Ingredient[] = [];
    for (const ingredient of ingredientsData) {
      ingredients.push(new Ingredient(ingredient.name, ingredient.amount));
    }
    const recipe = new Recipe(name, description, imagePath, ingredients, poisonLevel, rating);

    if (this.editMode && this.editedIndex !== undefined) {
      // Edit recipe
      this.recipesService.updateRecipe(recipe, ['/recipes', '' + this.editedIndex]);
    } else {
      // New recipe
      this.recipesService.addRecipe(recipe, ['/recipes', '' + this.nextIndex]);
    }
    this.recipeForm?.reset();

  }

  getIngredients(): FormArray {
    return this.recipeForm?.get('ingredients') as FormArray;
  }

  onAddIngredient(): void {
    this.getIngredients().push(new FormGroup({
        name: new FormControl('Bohnen', Validators.required),
        amount: new FormControl('20', [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')])
      }
    ));
  }

  onDeleteIngredient(i: number): void {
    this.getIngredients().removeAt(i);
  }

  onCancel(): void {
    this.recipesService.stopEdit(['/recipes', '' + this.editedIndex]);
  }

}
