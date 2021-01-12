import {Component, OnInit} from '@angular/core';
import {LoggingService} from '../shared/logging.service';
import {RecipesService} from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  constructor(private loggingService: LoggingService, private recipesService: RecipesService) {
  }

  ngOnInit(): void {
  }

}
