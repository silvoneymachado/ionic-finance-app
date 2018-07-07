import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
/*
  Generated class for the MonthSelectorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MonthSelectorProvider {
  private _className: string = "month";
  constructor(private storage: Storage) {}

  public convertDateMonthYearString(date: Date): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      try {
        let month: string;
        let item: number = date.getMonth();
        item += 1;
        month = item + "/" + date.getFullYear();
        resolve(month);
      } catch (error) {
        reject(error);
      }
    });
  }

  public addItemLocal(month: Date): Promise<String> {
    return new Promise<String>((resolve, reject) => {
      try {
        this.getItemsLocal().then(items => {
          this.convertDateMonthYearString(month)
            .then(monthS => {
              if (items) {
                if (items.filter(item => item !== monthS)) {
                  items.push(monthS);
                  this.clearLocal().then(res => {
                    this.setItemsLocal(items)
                      .then(itemsStorage => {
                        resolve(monthS);
                      })
                      .catch(err => reject(err));
                  });
                } else {
                  resolve(monthS);
                }
              } else {
                items = [monthS];
                this.setItemsLocal(items)
                  .then(itemsStorage => {
                    resolve(monthS);
                  })
                  .catch(err => reject(err));
              }
            })
            .catch(err => reject(err));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  public setSelectedMonth(month: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      try {
        this.storage
          .set("selected" + this._className, month)
          .then(result => {
            resolve(result);
          })
          .catch(err => {
            reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  public getSelectedMonth(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      try {
        this.storage
          .get("selected" + this._className)
          .then(result => {
            resolve(result);
          })
          .catch(err => {
            reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  public setItemsLocal(items: String[]): Promise<String[]> {
    return new Promise<String[]>((resolve, reject) => {
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

  public getItemsLocal(): Promise<String[]> {
    return new Promise<String[]>((resolve, reject) => {
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

  private convertDateAndAddMonthYearString(
    date: Date,
    plus: number
  ): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      try {
        let month: string;
        let item: number = date.getMonth() + 1;
        item += plus;
        month = item + "/" + date.getFullYear();
        resolve(month);
      } catch (error) {
        reject(error);
      }
    });
  }

  public setFrequency(date: Date, installments: number): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      try {
        let month: string[];
        this.convertDateMonthYearString(date).then(monthS => {
          month = [monthS];
          if (installments == 1) {
            resolve(month);
          } else {
            for (let i = 1; i < installments; i++) {
              this.convertDateAndAddMonthYearString(date, i).then(ite => {
                month.push(ite);
              });
            }
          }
          resolve(month);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
