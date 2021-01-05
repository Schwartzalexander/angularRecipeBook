import { AfterContentInit, Component, ContentChild, ElementRef, EventEmitter } from '@angular/core';
import { Ingredient } from './model/ingredient.model';
import { LoggingService } from './services/logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit {

  page : string = 'recipes'
  lastAddedIngredient : Ingredient | undefined
  
  title = 'PROJECT';
  // @ContentChild('contentFooter', {static: true}) footer : ElementRef;

  constructor(private loggingService: LoggingService) {}
  
  onItemAdded(ingredient: Ingredient) {
    this.loggingService.log("The item "+ingredient+" was added, dude. Sincerly, your aplication.") 
    this.lastAddedIngredient = ingredient
  }

  onItemEdited(ingredient: Ingredient) {
    this.loggingService.log("The item "+ingredient+" was edited, dude. Sincerly, your aplication.") 
  } 
  
  ngAfterContentInit() {
    //     this.loggingService.log('Footer content: ' + this.footer.nativeElement.textContent)
  }

  changePage(event : any) {
    this.loggingService.log(event.name);
    this.page = event.name
    
  }
}

