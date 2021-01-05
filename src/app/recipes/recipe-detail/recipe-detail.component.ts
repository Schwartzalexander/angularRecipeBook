import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/model/recipe.model';
import { DataService } from 'src/app/services/data.service';
import { LoggingService } from 'src/app/services/logging.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input('recipe') recipe: Recipe | undefined

  constructor(private dataService: DataService, private loggingService: LoggingService, private recipeService: RecipeService) {

    this.dataService.eventEmitter.subscribe((message: string) => this.reactToEventFromService(message))
  }

  ngOnInit(): void {
  }

  /**
   * This function is called, after the eventEmitter in dataService is emitted. This happens, when clicking the edit button in shopping-edit-component.
   * @param message 
   */
  reactToEventFromService(message: string) {
    this.loggingService.log(message)
    //alert(message)
  }

}
