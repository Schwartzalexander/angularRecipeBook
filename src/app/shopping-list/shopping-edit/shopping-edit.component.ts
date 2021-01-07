import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Ingredient} from 'src/app/model/ingredient.model';
import {DataService} from 'src/app/services/data.service';
import {LoggingService} from 'src/app/services/logging.service';
import {ShoppingService} from 'src/app/services/shopping.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('shoppingForm') shoppingForm: NgForm | undefined;
  id: number | undefined;
  editMode = false;

  // Default values
  defaultName = 'Beer';
  defaultAmount = 20;

  subscription: Subscription | undefined;

  constructor(private loggingService: LoggingService, private dataService: DataService, private shoppingService: ShoppingService) {
  }

  ngOnInit(): void {
    this.subscription = this.shoppingService.clickOnIngredientSubject.subscribe(id => {
      this.id = id;
      this.editMode = true;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onAddClicked(): void {
    const name = this.shoppingForm?.value.name;
    const amount = this.shoppingForm?.value.amount;

    const ingredient = new Ingredient(name, parseInt(amount, 0));
    this.shoppingService.ingredients.push(ingredient);

    this.shoppingForm?.reset();
  }

  onEditClicked(nameInput: HTMLInputElement, amountInput: HTMLInputElement): void {
  }

}
