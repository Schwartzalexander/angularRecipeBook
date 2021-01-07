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

  editMode = false;
  editedId: number | undefined;
  editedIngredient: Ingredient | undefined;

  // Default values
  defaultName = 'Beer';
  defaultAmount = 20;

  subscription: Subscription | undefined;

  constructor(private loggingService: LoggingService, private dataService: DataService, private shoppingService: ShoppingService) {
  }

  ngOnInit(): void {
    this.subscription = this.shoppingService.clickOnIngredientSubject.subscribe(id => {
      this.editedId = id;
      this.editMode = true;
      this.editedIngredient = this.shoppingService.ingredients[id];

      this.shoppingForm?.setValue(
        {
          name: this.editedIngredient?.name,
          amount: this.editedIngredient?.amount
        });
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onSubmit(): void {
    const name = this.shoppingForm?.value.name;
    const amount = this.shoppingForm?.value.amount;

    const ingredient = new Ingredient(name, parseInt(amount, 0));
    if (this.editMode && this.editedId !== undefined)
      this.shoppingService.ingredients[this.editedId] = ingredient;
    else
      this.shoppingService.ingredients.push(ingredient);

    this.onClear();
  }

  onEditClicked(nameInput: HTMLInputElement, amountInput: HTMLInputElement): void {
  }

  onClear(): void {
    this.editMode = false;
    this.editedId = undefined;
    this.shoppingForm?.reset();
  }

  onDelete(): void {
    if (this.editMode && this.editedId !== undefined)
      this.shoppingService.ingredients.splice(this.editedId, 1);

    this.onClear();
  }
}
