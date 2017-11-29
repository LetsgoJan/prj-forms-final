import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import {copyStyles} from "@angular/animations/browser/src/util";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    // this.ingredients = this.slService.getIngredients();
    this.slService.getIngredients()
      .subscribe(
        (response) => {
          this.ingredients=response.json();
          console.log(response.json());
        },
        (error) => console.log(error)
      );
    this.subscription = this.slService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }

  onEditItem(index: number) {
    let editItem = this.ingredients[index];
    this.slService.startedEditing.next(editItem);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
