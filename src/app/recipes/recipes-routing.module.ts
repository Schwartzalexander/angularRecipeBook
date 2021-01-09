import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NoRecipeShownComponent} from './no-recipe-shown/no-recipe-shown.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipesComponent} from './recipes.component';
import {RecipesResolverService} from './recipes-resolver.service';
import {AuthGuard} from '../auth/auth.guard';

const recipeRoutes: Routes = [
  {
    path: 'recipes',
    canActivate: [AuthGuard],
    component: RecipesComponent,
    children: [
      {path: '', component: NoRecipeShownComponent, resolve: [RecipesResolverService]},
      {path: 'new', component: RecipeEditComponent, resolve: [RecipesResolverService]},
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]},
    ]
  },
  // {path: '**', component: RecipeItemComponent, resolve: [RecipesResolverService]}
];

@NgModule({
  imports: [RouterModule.forChild(recipeRoutes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {
}
