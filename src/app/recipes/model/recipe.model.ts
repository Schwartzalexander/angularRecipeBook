import {Ingredient} from '../../shared/model/ingredient.model';

export class Recipe {
  constructor(public name: string, public description: string, public imagePath: string, public ingredients: Ingredient[], public poisonLevel: number, public rating: number) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
    this.poisonLevel = poisonLevel;
    this.rating = rating;
  }
}
