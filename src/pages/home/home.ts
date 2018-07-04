import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(public navCtrl: NavController) {}
  /**
   * Mostra o total de despesas e receitas, além do saldo
   * verifica se o localstorage já possui as listas pré definidas e persiste caso não
   */

  /**
   * setInitialItems
   */
  public setInitialItems() {}
}
