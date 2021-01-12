import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import {Observable, Subject} from 'rxjs';
import {State} from './store/recipes.reducer';
import {Recipe} from './model/recipe.model';
import {addRecipe, deleteRecipe, fetchRecipes, selectRecipe, setRecipes, startEdit, stopEdit, storeRecipes, updateRecipe} from './store/recipes.actions';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  //   [
  //   new Recipe('Pfannkuchen', 'Der beste Pfannkuchen der Welt', 'https://image.brigitte.de/10912866/t/G_/v3/w960/r1/-/pfannkuchen.jpg',
  //     [
  //       new Ingredient('Flour', 413),
  //       new Ingredient('Milk', 1000),
  //       new Ingredient('Egg', 3),
  //       new Ingredient('Salt', 10)
  //     ], 0, 5),
  //   new Recipe('Krabbenbrötchen', 'Joghurt, Mayonnaise, Dill und einen Spritzer Zitrone mit der gepressten oder fein gehackten
  // Knoblauchzehe vermischen. Mit einer Prise Salz, Pfeffer und Zucker abschmecken, dann 30 Minuten kühl stellen. Das Salatblatt in feine
  // Streifen schneiden. Das Brötchen aufschneiden (evtl. etwas Teig aus der Mitte entfernen), die Unterseite zuerst mit dem Salat, dann
  // mit den Krabben belegen, die Joghurtmischung darüber geben und mit der oberen Brötchenhälfte abdecken. Schmeckt besonders gut, wenn
  // das Brötchen noch warm ist.', 'https://img.chefkoch-cdn.de/rezepte/125521053780376/bilder/264439/crop-960x640/krabbenbroetchen.jpg', [
  // new Ingredient('Rolls', 3), new Ingredient('Crabs', 30), new Ingredient('Joghurt', 50), new Ingredient('Dill', 100) ], 1, 4), new
  // Recipe('Mettigel', 'Lecker stachelig',
  // 'https://img.chefkoch-cdn.de/rezepte/1229761228049609/bilder/778860/crop-960x640/party-mettigel.jpg', [ new Ingredient('Mett', 2000),
  // new Ingredient('Onions', 6), new Ingredient('Olive', 1) ], 3, 5), new Recipe('Reine Luft', 'Erfrischend',
  // 'https://www.wasistwas.de/files/wiwtheme/frag-nach/img/die-frage-der-woche/shutterstock_182048660_luft_b.jpg', [], 3, 1) ];

  recipesObservable: Observable<State>;

  constructor(private store: Store<fromApp.AppState>) {
    this.recipesObservable = this.store.select(state => state.recipes);
  }

  dispatchRecipes(recipes: Recipe[]): void {
    this.store.dispatch(setRecipes({recipes}));
  }

  deleteRecipe(redirectUrl?: string[]): void {
    this.store.dispatch(deleteRecipe({redirectUrl}));
  }

  addRecipe(recipe: Recipe, redirectUrl?: string[]): void {
    this.store.dispatch(addRecipe({recipe, redirectUrl}));
  }

  updateRecipe(recipe: Recipe, redirectUrl?: string[]): void {
    this.store.dispatch(updateRecipe({recipe, redirectUrl}));
  }

  selectRecipe(selectedIndex: number): void {
    this.store.dispatch(selectRecipe({selectedIndex}));
  }

  startEdit(): void {
    this.store.dispatch(startEdit());
  }

  stopEdit(redirectUrl?: string[]): void {
    this.store.dispatch(stopEdit({redirectUrl}));
  }

  fetchRecipes(): void {
    this.store.dispatch(fetchRecipes());
  }

  storeRecipes(recipesSuccessSubject: Subject<any>, recipesErrorSubject: Subject<any>): void {
    this.store.dispatch(storeRecipes());

  }
}
