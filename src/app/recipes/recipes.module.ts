import {NgModule} from '@angular/core';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipeItemComponent} from './recipe-list/recipe-item/recipe-item.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipesComponent} from './recipes.component';
import {NoRecipeShownComponent} from './no-recipe-shown/no-recipe-shown.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {FilterPipe} from './recipe-list/filter.pipe';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RecipesRoutingModule} from './recipes-routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipesComponent,
    NoRecipeShownComponent,
    RecipeEditComponent,
    FilterPipe,
  ],
  imports: [
    RecipesRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class RecipesModule {
}
