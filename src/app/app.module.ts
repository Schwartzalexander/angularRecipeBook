import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicHighlightDirective } from './directives/basic-highlight.directive';
import { BestHighlightDirective } from './directives/best-highlight.directive';
import { BetterHighlightDirective } from './directives/better-highlight.directive';
import { DropdownDirective } from './directives/dropdown.directive';
import { UnlessDirective } from './directives/unless.directive';
import { Error404Component } from './error-pages/error404/error404.component';
import { FooterComponent } from './footer/footer.component';
import { EvenComponent } from './footer/game/even/even.component';
import { GameControlComponent } from './footer/game/game-control/game-control.component';
import { GameComponent } from './footer/game/game.component';
import { OddComponent } from './footer/game/odd/odd.component';
import { HeaderComponent } from './header/header.component';
import { OberservablesComponent } from './oberservables/oberservables.component';
import { NoRecipeShownComponent } from './recipes/no-recipe-shown/no-recipe-shown.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipesComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    FooterComponent,
    GameComponent,
    GameControlComponent,
    OddComponent,
    EvenComponent,
    BasicHighlightDirective,
    BetterHighlightDirective,
    BestHighlightDirective,
    UnlessDirective,
    DropdownDirective,
    Error404Component,
    NoRecipeShownComponent,
    RecipeEditComponent,
    OberservablesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
