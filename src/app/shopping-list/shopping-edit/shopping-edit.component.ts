import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/model/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @Output() itemAdded = new EventEmitter<{ name: string, amount: number }>()
  @Output('itemEditedSuperBindingNAME') itemEdited = new EventEmitter<{ name: string, amount: number }>()

  @ViewChild('nameInput', { static: false }) nameInput: ElementRef | undefined
  @ViewChild('amountInput') amountInput: ElementRef | undefined

  constructor() { }

  ngOnInit(): void {
  }

  onAddClicked(nameInput: HTMLInputElement, amountInput: HTMLInputElement) {
    console.log(this.nameInput)
    console.log(nameInput)
    // this.itemAdded.emit({ name: nameInput.value, amount: amountInput.value })
    const ingredient = new Ingredient(nameInput.value, parseInt(amountInput.value))
    this.itemAdded.emit(ingredient)
  }
  onEditClicked() {
    if (this.nameInput === undefined || this.amountInput === undefined)
      return;
    const ingredient = new Ingredient(this.nameInput.nativeElement.value, this.amountInput.nativeElement.value)
    this.itemEdited.emit(ingredient)
  }
}
