import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from '../model/ingredient.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input('lastAddedIngredient') lastAddedIngredient : Ingredient
  constructor() { }

  ngOnInit(): void {
  }

}
