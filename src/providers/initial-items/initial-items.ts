import { Injectable } from "@angular/core";

import { CategoryType } from "../../models/classes";
import { EXPENSE, INCOME } from "../../models/util/mocks/categoryType.mock";
import {
  INITIAL_CATEGORIES,
  INITIAL_EXPENSES
} from "../../models/util/mocks/initial-items.mock";
import {
  CategoryProvider,
  CategoryTypeProvider,
  ExpenseProvider
} from "../providers";

/*
  Generated class for the InitialItemsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InitialItemsProvider {
  constructor(
    private _categoryProvider: CategoryProvider,
    private _categoryTypeProvider: CategoryTypeProvider,
    private _expenseProvider: ExpenseProvider
  ) {}

  /**
   * setAllInitialItems
   */
  public setAllInitialItems(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      try {
        let items: Promise<boolean>[] = [];
        items.push(this.setInitialCetegoryTypes());
        items.push(this.setInitialCategories());
        // items.push(this.setInitialExpenses());
        Promise.all(items).then(ite => resolve(true));
      } catch (error) {
        reject(error);
      }
    });
  }

  private setInitialCategories(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      try {
        this._categoryProvider
          .getItemsLocal()
          .then(cat => {
            if (cat) {
              resolve(true);
            } else {
              this._categoryProvider
                .setItemsLocal(INITIAL_CATEGORIES)
                .then(result => {
                  resolve(true);
                })
                .catch(err => {
                  reject(err);
                });
            }
          })
          .catch(error => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  private setInitialExpenses(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      try {
        this._expenseProvider
          .setItemsLocal(INITIAL_EXPENSES)
          .then(result => {
            resolve(true);
          })
          .catch(err => {
            reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  }
  private setInitialCetegoryTypes(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      try {
        this._categoryTypeProvider
          .getItemsLocal()
          .then(tCat => {
            if (tCat) {
              resolve(true);
            } else {
              this._categoryTypeProvider.setItemsLocal([EXPENSE, INCOME]);
              resolve(true);
            }
          })
          .catch(error => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  private setInitialTags() {}

  private setInitialRevenues() {}
}
