import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/model/ingredient.model';
import {LoggingService} from '../shared/logging.service';
import {ShoppingService} from './shopping.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredientsObservable: Observable<{ ingredients: Ingredient[] }> | undefined;

  constructor(private loggingService: LoggingService, private shoppingService: ShoppingService) {
  }

  ngOnInit(): void {
    this.ingredientsObservable = this.shoppingService.ingredientsObservable;
  }

  ngOnDestroy(): void {
  }

  onListItemClicked(index: number): void {
    this.shoppingService.startEdit(index);
  }

}
