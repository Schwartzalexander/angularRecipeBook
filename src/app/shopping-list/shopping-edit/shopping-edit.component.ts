import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/model/ingredient.model';
import { DataService } from 'src/app/services/data.service';
import { LoggingService } from 'src/app/services/logging.service';

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

  constructor(private loggingService: LoggingService, private dataSerive : DataService) {}

  ngOnInit(): void {
  }

  onAddClicked(nameInput: HTMLInputElement, amountInput: HTMLInputElement) {
    this.loggingService.log(this.nameInput)
    this.loggingService.log(nameInput)
    // this.itemAdded.emit({ name: nameInput.value, amount: amountInput.value })
    const ingredient = new Ingredient(nameInput.value, parseInt(amountInput.value))
    this.itemAdded.emit(ingredient)
  }
  onEditClicked(nameInput: HTMLInputElement, amountInput: HTMLInputElement) {
    if (this.nameInput === undefined || this.amountInput === undefined)
      return;
    const ingredient = new Ingredient(this.nameInput.nativeElement.value, this.amountInput.nativeElement.value)
    this.itemEdited.emit(ingredient)
    this.dataSerive.eventEmitter.emit("The edit shopping list button was clicked, milord")
  }
}
