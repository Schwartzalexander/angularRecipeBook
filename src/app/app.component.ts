import { AfterContentInit, Component, ContentChild, ElementRef, EventEmitter } from '@angular/core';
import { Ingredient } from './model/ingredient.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit {

  page : string = 'recipes'
  lastAddedIngredient : Ingredient
  
  title = 'PROJECT';
  // @ContentChild('contentFooter', {static: true}) footer : ElementRef;

  
  onItemAdded(ingredient: Ingredient) {
    console.log("The item "+ingredient+" was added, dude. Sincerly, your aplication.") 
    this.lastAddedIngredient = ingredient
  }

  onItemEdited(ingredient: Ingredient) {
    console.log("The item "+ingredient+" was edited, dude. Sincerly, your aplication.") 
  } 
  
  ngAfterContentInit() {
    // console.log('Footer content: ' + this.footer.nativeElement.textContent)
  }

  changePage(event : any) {
    console.log(event.name);
    this.page = event.name
    
  }
}

