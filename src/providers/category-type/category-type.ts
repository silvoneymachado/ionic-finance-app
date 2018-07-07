import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

import { CategoryType } from "../../models/classes";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";

/*
  Generated class for the CategoryTypeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoryTypeProvider {
  private _className: string = "categoryType";
  private _data: { category: CategoryType[] } = { category: [] };
  private _categoryType: BehaviorSubject<CategoryType[]> = new BehaviorSubject(
    []
  );

  constructor(public http: HttpClient, private storage: Storage) {}

  /**
   * category
   */
  public category(): Observable<CategoryType[]> {
    this.getItemsLocal()
      .then(items => {
        if (items) {
          this._data.category = items;
          this._categoryType.next(Object.assign({}, this._data).category);
        } else {
          this._categoryType.next([]);
        }
      })
      .catch(error => console.log(error));
    return this._categoryType.asObservable();
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
  private addItemLocal(item: CategoryType): Promise<CategoryType> {
    return new Promise<CategoryType>((resolve, reject) => {
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
  public saveItemLocal(item: CategoryType): Promise<CategoryType> {
    return new Promise<CategoryType>((resolve, reject) => {
      try {
        if (item.id == 0) {
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
  public setItemsLocal(items: CategoryType[]): Promise<CategoryType[]> {
    return new Promise<CategoryType[]>((resolve, reject) => {
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
  public getItemsLocal(): Promise<CategoryType[]> {
    return new Promise<CategoryType[]>((resolve, reject) => {
      try {
        this.storage
          .get(this._className)
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

  /**
   * getItemByIdLocal
   */
  public getItemByIdLocal(id: number): Promise<CategoryType> {
    return new Promise<CategoryType>((resolve, reject) => {
      try {
        this.getItemsLocal()
          .then(items => {
            items = items.filter(item => item.id === id);
            if (items.length > 0) {
              const item: CategoryType = items[0] as CategoryType;
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
  private updateItemsLocal(item: CategoryType): Promise<CategoryType> {
    return new Promise<CategoryType>((resolve, reject) => {
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
