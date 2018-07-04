import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: "page-expense",
  templateUrl: "expense.html"
})
export class ExpensePage {
  public categories: any = [];
  public itemExpandHeight: number = 50;

  constructor(public navCtrl: NavController) {
    this.categories = [{ expanded: false }];
  }

  public expandItem(item) {
    this.categories.map(listItem => {
      if (item == listItem) {
        listItem.expanded = !listItem.expanded;
      } else {
        listItem.expanded = false;
      }

      return listItem;
    });
  }
}
