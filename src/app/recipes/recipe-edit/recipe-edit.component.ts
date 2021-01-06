import { Component, OnInit } from '@angular/core';
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
  recipe : Recipe | undefined

  constructor(private activeRoute: ActivatedRoute, private recipeService : RecipeService) { }

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

}
