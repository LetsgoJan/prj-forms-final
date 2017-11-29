import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { ShoppingListComponent} from "../shopping-list.component";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  // editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing
      .subscribe(
        (item: Ingredient) => {
          // this.editedItemIndex = index;
          this.editMode = true;
          // this.editedItem = this.slService.getIngredient(index);
          console.log(item);
          this.slService.getIngredient(item._id)
            .subscribe(
              (response) => {
                console.log(response.json());
                this.editedItem = response.json();
                this.slForm.setValue({
                  name: this.editedItem.name,
                  amount: this.editedItem.amount
                })
              },
              (error) => console.log(error)
            );
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount, null);
    if (this.editMode) {
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      this.slService.updateIngredient(this.editedItem._id, newIngredient)
        .subscribe(
          (response) => console.log(response),
          (error) => console.log(error)
        );
    } else {
      // this.slService.addIngredient(newIngredient);
      this.slService.addIngredient(newIngredient)
        .subscribe(
          (response) => console.log(response.json()),
          (error) => console.log(error)
        );
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    // this.slService.deleteIngredient(this.editedItemIndex);
    this.slService.deleteIngredient(this.editedItem._id)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );

    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
