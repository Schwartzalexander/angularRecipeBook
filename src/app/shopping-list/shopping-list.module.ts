import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShoppingListComponent} from './shopping-list.component';
import {ShoppingEditComponent} from './shopping-edit/shopping-edit.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    CommonModule, // Only import BrowserModule once in AppModule. In all other modules import CommonModule instead.
    RouterModule,
    FormsModule,
    RouterModule.forChild([
      {path: 'shoppingList', component: ShoppingListComponent},
    ]),
    ReactiveFormsModule
  ]
})
export class ShoppingListModule {
}
