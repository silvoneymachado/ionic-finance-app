import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

import { Category, Expense } from "../../models/classes";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";

/*
  Generated class for the CategoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoryProvider {
  private _className: string = "category";
  private _data: { category: Category[] } = { category: [] };
  private _category: BehaviorSubject<Category[]> = new BehaviorSubject([]);

  constructor(public http: HttpClient, public storage: Storage) {}

  /**
   * category
   */
  public categories(): Observable<Category[]> {
    this.getItemsLocal()
      .then(items => {
        if (items) {
          this._data.category = items;
          this._category.next(Object.assign({}, this._data).category);
        } else {
          this._category.next([]);
        }
      })
      .catch(error => console.log(error));
    return this._category.asObservable();
  }

  /**
   * clearLocal
   */
  private clearLocal(): Promise<boolean> {
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
  private addItemLocal(item: Category): Promise<Category> {
    return new Promise<Category>((resolve, reject) => {
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
   * saveItemLocal
   */
  public saveItemLocal(item: Category): Promise<Category> {
    return new Promise<Category>((resolve, reject) => {
      try {
        if (item.id > 0) {
          this.addItemLocal(item)
            .then(result => {
              resolve(result);
            })
            .catch(err => {
              reject(err);
            });
        } else {
          this.updateItemsLocal(item)
            .then(result => {
              resolve(result);
            })
            .catch(err => {
              reject(err);
            });
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * setItemsLocal
   */
  public setItemsLocal(items: Category[]): Promise<Category[]> {
    return new Promise<Category[]>((resolve, reject) => {
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
  public getItemsLocal(): Promise<Category[]> {
    return new Promise<Category[]>((resolve, reject) => {
      try {
        this.storage
          .get(this._className)
          .then(items => {
            resolve(JSON.parse(items));
            // if (!items) {
            //   resolve(items);
            // } else {
            //   resolve(JSON.parse(items));
            // }
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
   * getItemByIdLocal
   */
  public getItemByIdLocal(id: number): Promise<Category> {
    return new Promise<Category>((resolve, reject) => {
      try {
        this.getItemsLocal()
          .then(items => {
            items = items.filter(item => item.id === id);
            if (items.length > 0) {
              const item: Category = items[0] as Category;
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
        this.getExpensesLocal()
          .then(exps => {
            if (exps) {
              let listPro: Promise<boolean>[] = [];
              exps.forEach(exp => {
                if (exp.idCategory == id) {
                  listPro.push(this.deleteExpenseLocal(exp.id));
                }
              });
              Promise.all(listPro)
                .then(res => {
                  this.deleteCat(id)
                    .then(res1 => {
                      resolve(res1);
                    })
                    .catch(err => reject(err));
                })
                .catch(err => reject(err));
            } else {
              this.deleteCat(id)
                .then(res1 => {
                  resolve(res1);
                })
                .catch(err => reject(err));
            }
          })
          .catch(err => reject(err));
      } catch (error) {
        reject(error);
      }
    });
  }

  private getExpensesLocal(): Promise<Expense[]> {
    return new Promise<Expense[]>((resolve, reject) => {
      try {
        this.storage
          .get("expense")
          .then(items => {
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

  private deleteExpenseLocal(id: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      try {
        this.getExpensesLocal()
          .then(items => {
            if (items) {
              items = items.filter(item => item.id !== id);
              this.setExpensesLocal(items);
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

  private setExpensesLocal(items: Expense[]): Promise<Expense[]> {
    return new Promise<Expense[]>((resolve, reject) => {
      try {
        this.storage
          .set("expense", JSON.stringify(items))
          .then(itemsStorage => resolve(itemsStorage))
          .catch(err => reject(err));
      } catch (error) {
        reject(error);
      }
    });
  }
  private deleteCat(id: number): Promise<boolean> {
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
  private updateItemsLocal(item: Category): Promise<Category> {
    return new Promise<Category>((resolve, reject) => {
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
