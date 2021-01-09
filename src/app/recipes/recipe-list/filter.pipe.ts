import {Pipe, PipeTransform} from '@angular/core';
import {Recipe} from '../model/recipe.model';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(recipes: Recipe[] | any[] | undefined, filterString: string, searchDescriptions: boolean, searchIngredients: boolean): any[] | undefined {
    if (recipes === undefined || recipes.length === 0 || filterString === '')
      return recipes;

    filterString = filterString.toLowerCase();

    const filteredRecipes: Recipe[] = [];
    for (const recipe of recipes) {
      if (recipe.name.toLowerCase().indexOf(filterString) >= 0) {
        filteredRecipes.push(recipe);
        continue;
      }
      if (searchDescriptions && recipe.description.toLowerCase().indexOf(filterString) >= 0) {
        filteredRecipes.push(recipe);
        continue;
      }
      if (searchIngredients) {
        for (const ingredient of recipe.ingredients) {
          if (ingredient.name.toLowerCase().indexOf(filterString) >= 0) {
            filteredRecipes.push(recipe);
            break;
          }
        }
      }
    }
    return filteredRecipes;
  }

}
