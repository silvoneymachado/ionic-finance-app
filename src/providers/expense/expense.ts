import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { Injectable } from "@angular/core";

import { Expense } from "./../../models/classes";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ExpenseProvider {
  private _className: string = "expense";
  private _data: { expenses: Expense[] } = { expenses: [] };
  private _expenses: BehaviorSubject<Expense[]> = new BehaviorSubject([]);
  constructor(public http: HttpClient, public storage: Storage) {}

  /**
   * expenses
   */
  public expenses(): Observable<Expense[]> {
    this.getItemsLocal()
      .then(items => {
        if (items) {
          this._data.expenses = items;
          this._expenses.next(Object.assign({}, this._data).expenses);
        } else {
          this._expenses.next([]);
        }
      })
      .catch(error => console.log(error));
    return this._expenses.asObservable();
  }

  /**
   * clearLocal
   */
  public clearLocal(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      try {
        this.storage
          .remove(this._className)
          .then(res => resolve(true))
          .catch(err => reject(err));
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * addItemLocal
   */
  public addItemLocal(item: Expense): Promise<Expense> {
    return new Promise<Expense>((resolve, reject) => {
      try {
        this.getItemsLocal().then(items => {
          if (items) {
            item.id = items.length === 0 ? 1 : items[items.length - 1].id + 1;
            items.push(item);

            this.clearLocal().then(res => {
              this.setItemsLocal(items);
            });
          } else {
            item.id = 1;
            items = [item];
            this.setItemsLocal(items);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * setItemsLocal
   */
  public setItemsLocal(items: Expense[]): Promise<Expense[]> {
    return new Promise<Expense[]>((resolve, reject) => {
      try {
        this.storage
          .set(this._className, JSON.stringify(items))
          .then(itemsStorage => resolve(itemsStorage))
          .catch(err => reject(err));
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * getItemsLocal
   */
  public getItemsLocal(): Promise<Expense[]> {
    return new Promise<Expense[]>((resolve, reject) => {
      try {
        this.storage
          .get(this._className)
          .then(items => {
            console.log(items);
            resolve(JSON.parse(items));
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * getItemByIdLocal
   */
  public getItemByIdLocal(id: number): Promise<Expense> {
    return new Promise<Expense>((resolve, reject) => {
      try {
        this.getItemsLocal()
          .then(items => {
            items = items.filter(item => item.id === id);
            if (items.length > 0) {
              const item: Expense = items[0] as Expense;
              resolve(item);
            } else {
              resolve(undefined);
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

  /**
   * deleteItemBYIdLocal
   */
  public deleteItemByIdLocal(id: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      try {
        this.getItemsLocal()
          .then(items => {
            if (items) {
              items = items.filter(item => item.id !== id);
              this.setItemsLocal(items);
              resolve(true);
            } else {
              resolve(false);
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

  /**
   * updateItemsLocal
   */
  public updateItemsLocal(item: Expense): Promise<Expense> {
    return new Promise<Expense>((resolve, reject) => {
      try {
        this.deleteItemByIdLocal(item.id).then(res => {
          if (res) {
            this.addItemLocal(item)
              .then(updatedItem => resolve(updatedItem))
              .catch(err => reject(err));
          } else {
            reject();
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
