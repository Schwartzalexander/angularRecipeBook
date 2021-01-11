import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Ingredient} from 'src/app/shared/model/ingredient.model';
import {DataService} from 'src/app/junk/services/data.service';
import {LoggingService} from 'src/app/shared/logging.service';
import {ShoppingService} from 'src/app/shopping-list/shopping.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('shoppingForm') shoppingForm: NgForm | undefined;

  editMode = false;
  editedIngredient: Ingredient | undefined;

  ingredientsSubscription: Subscription | undefined;

  // Default values
  defaultName = 'Beer';
  defaultAmount = 20;

  subscription: Subscription | undefined;

  constructor(private loggingService: LoggingService, private dataService: DataService, private shoppingService: ShoppingService) {
  }

  ngOnInit(): void {
    this.ingredientsSubscription = this.shoppingService.ingredientsObservable?.subscribe(stateData => {
      if (stateData.editedIndex !== undefined) {
        this.editMode = true;
        this.editedIngredient = stateData.editedIngredient;

        this.shoppingForm?.setValue(
          {
            name: this.editedIngredient?.name,
            amount: this.editedIngredient?.amount
          });
      } else {
        this.editMode = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.shoppingService.stopEdit();
    this.ingredientsSubscription?.unsubscribe();
  }

  onSubmit(): void {
    const name = this.shoppingForm?.value.name;
    const amount = this.shoppingForm?.value.amount;

    const ingredient = new Ingredient(name, parseInt(amount, 0));
    if (this.editMode)
      this.shoppingService.updateIngredient(ingredient);
    else {
      this.shoppingService.addIngredient(ingredient);
    }

    this.onClear();
  }

  onClear(): void {
    this.shoppingService.stopEdit();
    this.shoppingForm?.reset();
    this.editMode = false;
  }

  onDelete(): void {
    this.shoppingService.deleteIngredient();
    this.onClear();
  }
}
