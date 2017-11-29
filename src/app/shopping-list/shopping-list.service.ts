import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {ShoppingListComponent} from "./shopping-list.component";
import {forEach} from "@angular/router/src/utils/collection";

@Injectable()
export class ShoppingListService {
  constructor(private http: Http){}
  ingredientsChanged = new Subject<Ingredient[]>();
  // startedEditing = new Subject<number>();
  startedEditing = new Subject<Ingredient>();
  // public ingredients: Ingredient[];

  getIngredients() {
    //return this.ingredients.slice();
    return this.http.get('https://lesproject.herokuapp.com/api/shoppingList');
  }

  getIngredient(id: string) {
    // return this.ingredients[index];
    // const ingredient = this.ingredients[index];
    // console.log(id);
    return this.http.get('https://lesproject.herokuapp.com/api/shoppingList/' + id)
  }

  addIngredient(ingredient: Ingredient) {
    //this.ingredients.push(ingredient);
    //this.ingredientsChanged.next(this.ingredients.slice());
    // this.ingredients.push(ingredient);
    return this.http.post('https://lesproject.herokuapp.com/api/shoppingList', ingredient);

  }

  addIngredients(ingredients: Ingredient[]) {
     for (let ingredient of ingredients) {
       this.addIngredient(ingredient);
     }
    //this.ingredients.push(...ingredients);
    //this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(id: string, newIngredient: Ingredient) {
    // this.ingredients[index] = newIngredient;
    // this.ingredientsChanged.next(this.ingredients.slice());
    // const ingredient = this.ingredients[index];
    // for (let i = 0; i < this.ingredients.length; i++) {
    //   let ingredient = this.ingredients[i];
    //   if (ingredient._id == id) this.ingredients[i] = newIngredient;
    // }
    newIngredient._id = id;
    return this.http.put('https://lesproject.herokuapp.com/api/shoppingList/' + id, newIngredient);
  }

  deleteIngredient(id: string) {
    // this.ingredients.splice(index, 1);
    // this.ingredientsChanged.next(this.ingredients.slice());
    // const ingredient = this.ingredients[index];
    return this.http.delete('https://lesproject.herokuapp.com/api/shoppingList/' + id);
  }
}
