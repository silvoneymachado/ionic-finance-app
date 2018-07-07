import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import {
  InitialItemsProvider,
  MonthSelectorProvider
} from "../../providers/providers";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    private _iiProvider: InitialItemsProvider,
    private _monthSelectorProvider: MonthSelectorProvider
  ) {}
  /**
   * Mostra o total de despesas e receitas, além do saldo
   * verifica se o localstorage já possui as listas pré definidas e persiste caso não
   */

  /**
   * setInitialItems
   */

  ionViewDidLoad() {
    this.setInitialItems();
    this.setActualMonthSelected();
  }

  ionViewWillEnter() {}

  public setInitialItems() {
    this._iiProvider.setAllInitialItems();
  }

  private setActualMonthSelected(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      try {
        let date = new Date();
        this._monthSelectorProvider
          .convertDateMonthYearString(date)
          .then(month => {
            this._monthSelectorProvider
              .setSelectedMonth(month)
              .then(result => {
                resolve(true);
              })
              .catch(err => {
                reject(false);
              });
          })
          .catch(err => {
            reject(false);
          });
      } catch (error) {
        reject(error);
      }
    });
  }
}
