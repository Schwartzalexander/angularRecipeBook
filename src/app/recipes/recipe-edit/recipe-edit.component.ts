import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/model/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number | undefined
  editMode = false;
  recipe: Recipe | undefined

  @ViewChild('f') recipeForm: NgForm | undefined

  // select options
  poisonousOptions = ['No', 'A little', 'Only to my enemies', 'Yes, ma\'am']
  // radio options
  ratingOptions = ['1 star', '2 stars', '3 stars', '4 stars', '5 stars']


  // Default values
  defaultName = "Krautknödel"
  defaultDescription = "Nur für echte Deutsche. Alle anderen furzen vom Kraut."
  defaultImagePath = "https://ais.kochbar.de/kbrezept/109581_1009663/1200x1200/rumaenische-krautwickel-sarmale-rezept-bild-nr-2.jpg"
  defaultPoisonous = this.poisonousOptions[2]
  defaultRating = this.ratingOptions[4]

  //Two-way-bound values
  descriptionValue : string | undefined = this.defaultDescription
  constructor(private activeRoute: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      (params) => {
        this.id = +params['id']
        this.editMode = params['id'] != null
        if (this.editMode)
          this.recipe = this.recipeService.recipes[this.id]
      }
    )
  }

  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  onSubmit() {
    console.log(this.recipeForm) 
  }
}
