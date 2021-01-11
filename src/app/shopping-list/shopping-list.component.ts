import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Ingredient} from '../shared/model/ingredient.model';
import {LoggingService} from '../shared/logging.service';
import {ShoppingService} from './shopping.service';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import * as fromShoppingList from './store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  @Output() itemAdded = new EventEmitter<Ingredient>();
  @Output() itemEdited = new EventEmitter<Ingredient>();

  ingredientsObservable: Observable<{ ingredients: Ingredient[] }> | undefined;

  constructor(private loggingService: LoggingService, private shoppingService: ShoppingService,
              private store: Store<fromShoppingList.AppState>) {
  }

  ngOnInit(): void {
    this.ingredientsObservable = this.store.select('shoppingList');
  }

  onListItemClicked(index: number): void {
    this.shoppingService.startEdit(index);
  }
}
