import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/model/ingredient.model';
import { DataService } from 'src/app/services/data.service';
import { LoggingService } from 'src/app/services/logging.service';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @Output('itemEditedSuperBindingNAME') itemEdited = new EventEmitter<{ name: string, amount: number }>()
 

  @ViewChild('shoppingForm') shoppingForm: NgForm | undefined

  // Default values
  defaultName = "Beer"
  defaulAmount = 20

  constructor(private loggingService: LoggingService, private dataSerive : DataService, private shoppingService : ShoppingService) {}

  ngOnInit(): void {
  }

  onAddClicked() {
    let name = this.shoppingForm?.value.name
    let amount = this.shoppingForm?.value.amount
    
    const ingredient = new Ingredient(name, parseInt(amount))
    this.shoppingService.ingredients.push(ingredient)

    this.shoppingForm?.reset() 
  }

  
  onEditClicked(nameInput: HTMLInputElement, amountInput: HTMLInputElement) {
    if (this.nameInput === undefined || this.amountInput === undefined)
      return;
    const ingredient = new Ingredient(this.nameInput.nativeElement.value, this.amountInput.nativeElement.value)
    this.itemEdited.emit(ingredient)
    this.dataSerive.subject.next("The edit shopping list button was clicked, milord")
  }

}
