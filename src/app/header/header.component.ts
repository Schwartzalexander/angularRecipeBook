import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoggingService } from '../services/logging.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  @Output('onPageChange') pageChangeEmitter = new EventEmitter<{ name: string }>();



  constructor(private loggingService: LoggingService) {}

ngOnInit(): void {
}

onRecipesClicked() {
  this.loggingService.log('Recipes clicked')
  this.pageChangeEmitter.emit({name: 'recipes'})
}

onShoppingListClicked() {
  this.loggingService.log('Shopping list clicked')
  this.pageChangeEmitter.emit({name: 'shoppingList'})
}
}
