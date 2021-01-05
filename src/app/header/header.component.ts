import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  @Output('onPageChange') pageChangeEmitter = new EventEmitter<{ name: string }>();



constructor() { }

ngOnInit(): void {
}

onRecipesClicked() {
  console.log('Recipes clicked')
  this.pageChangeEmitter.emit({name: 'recipes'})
}

onShoppingListClicked() {
  console.log('Shopping list clicked')
  this.pageChangeEmitter.emit({name: 'shoppingList'})
}
}
