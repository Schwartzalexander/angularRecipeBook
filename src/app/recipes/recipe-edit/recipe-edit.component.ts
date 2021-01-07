import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Recipe} from 'src/app/model/recipe.model';
import {RecipeService} from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number | undefined;
  editMode = false;
  recipe: Recipe | undefined;
  recipeForm: FormGroup | undefined;

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

  constructor(private activeRoute: ActivatedRoute, private recipeService: RecipeService, private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      (params) => {
        this.id = +params.id;
        this.editMode = params.id != null;
        this.recipe = this.recipeService.recipes[this.id];
        this.recipeForm = this.createForm();
      }
    );
  }

  createForm(): FormGroup {
    let name = this.defaultName;
    let imagePath = this.defaultImagePath;
    let description = this.defaultDescription;
    let rating = this.defaultRating;
    let poisonLevel = this.defaultPoisonLevel;
    const ingredientsFormArray = new FormArray([]);

    if (this.editMode && this.id !== undefined && this.recipe !== undefined) {
      name = this.recipe.name;
      imagePath = this.recipe.imagePath;
      description = this.recipe.description;
      rating = this.recipe.rating;
      poisonLevel = this.recipe.poisonLevel;

      if (this.recipe.ingredients)
        for (const ingredient of this.recipe.ingredients) {
          ingredientsFormArray.push(
            new FormGroup({
                name: new FormControl(ingredient.name),
                amount: new FormControl((ingredient.amount))
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
    // console.log(this.recipeForm);
    // const name = this.recipeForm?.value.name;
    // const description = this.recipeForm?.value.description;
    // const imagePath = this.recipeForm?.value.imagePath;
    // const poisonLevel = this.recipeForm?.value.poisonLevel;
    // const rating = this.recipeForm?.value.rating;
    // const recipe = new Recipe(name, description, imagePath, [], poisonLevel, rating);
    // this.recipeService.recipes.push(recipe);
    this.recipeForm?.reset();
    const index = this.recipeService.recipes.length - 1;
    this.router.navigate(['..', index], {relativeTo: this.route});
  }

  getIngredients(): FormArray {
    return this.recipeForm?.get('ingredients') as FormArray;
  }

  onAddIngredient(): void {
    const control: FormControl = new FormControl('Butter', Validators.required);
    this.getIngredients().push(control);
  }

  onDeleteIngredient(i: number): void {
    this.getIngredients().removeAt(i);
  }

}
