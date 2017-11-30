import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import {Http} from "@angular/http";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

   private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService, private  http: Http) {}

  getRecipes() {
    this.http.get('https://lesproject.herokuapp.com/api/recipe')
      .subscribe(
        (response) => this.recipes = response.json(),
        (error) => console.log(error)
      );
    // this.recipes.slice();

    return this.http.get('https://lesproject.herokuapp.com/api/recipe');
  }

  getRecipe(index: number) {
    console.log(index);
    console.log(this.recipes);
    console.log(this.recipes[index]);
    return this.http.get('https://lesproject.herokuapp.com/api/recipe/' + this.recipes[index]._id);
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
    return this.http.post('https://lesproject.herokuapp.com/api/recipe', recipe);
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    newRecipe._id = this.recipes[index]._id;
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
    return this.http.put('https://lesproject.herokuapp.com/api/recipe/' + this.recipes[index]._id, newRecipe);
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
    return this.http.delete('https://lesproject.herokuapp.com/api/recipe/' + this.recipes[index]._id);
  }
}
