import { Component } from "@angular/core";
import { NavController, AlertController, ToastController } from "ionic-angular";
import { Observable } from "rxjs/Observable";

import { Category, Expense } from "../../models/classes";
import {
  CategoryProvider,
  ExpenseProvider,
  MonthSelectorProvider
} from "../../providers/providers";

@Component({
  selector: "page-expense",
  templateUrl: "expense.html"
})
export class ExpensePage {
  public itemExpandHeight: number = 50;
  public categories$: Observable<Category[]>;
  public expenses$: Observable<Expense[]>;
  public categories: Category[] = [];
  public expenses: Expense[] = [];
  public months: Date;

  constructor(
    public navCtrl: NavController,
    private _expenseProvider: ExpenseProvider,
    private _categoryProvider: CategoryProvider,
    private _monthSelectorProvider: MonthSelectorProvider,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ionViewDidLoad() {
    this.categories$ = this._categoryProvider.categories();
    this.expenses$ = this._expenseProvider.expenses();
  }

  ionViewWillEnter() {
    this.loadLists();
  }

  private loadLists() {
    this._categoryProvider.getItemsLocal().then(lstCat => {
      if (lstCat) {
        this._expenseProvider.getItemsLocal().then(lstExp => {
          if (lstExp) {
            this._monthSelectorProvider.getSelectedMonth().then(monthSt => {
              lstCat.forEach(cat => {
                cat.total = 0;
                for (let i = 0; i < lstExp.length; i++) {
                  lstExp[i];
                  for (let j = 0; j < lstExp[i].date.length; j++) {
                    lstExp[i].date[j];
                    if (lstExp[i].date[j] == monthSt) {
                      if (cat.id == lstExp[i].idCategory) {
                        lstExp[i].currentInstallment = j + 1;
                        lstExp[i].date = [monthSt];
                        cat.expense.push(lstExp[i]);
                        cat.total += lstExp[i].value;
                      }
                    }
                  }
                }
              });
            });
          } else {
            lstCat.forEach(cat => {
              cat.total = 0;
            });
          }
          this.categories = lstCat;
        });
      }
    });
  }

  public deleteExpense(ite: Expense) {
    let alert = this.alertCtrl.create({
      title: "Are you sure on delete this item?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel"
        },
        {
          text: "Ok",
          handler: data => {
            this._expenseProvider
              .deleteItemByIdLocal(ite.id)
              .then(res => {
                this.showToast("Despesa excluida com sucesso");
                this.loadLists();
              })
              .catch(err => console.log(err));
          }
        }
      ]
    });
    alert.present();
  }

  public deleteCategory(ite: Category) {
    let alert = this.alertCtrl.create({
      title:
        "Tem certeza que deseja apagar a categoria?\n Todos items desta também serão apagados!",
      buttons: [
        {
          text: "Cancel",
          role: "cancel"
        },
        {
          text: "Ok",
          handler: data => {
            this._categoryProvider
              .deleteItemByIdLocal(ite.id)
              .then(res => {
                this.showToast("Categoria excluida com sucesso");
                this.loadLists();
              })
              .catch(err => console.log(err));
          }
        }
      ]
    });
    alert.present();
  }

  public addItem(cat: Category) {
    let expense: Expense;
    let now = new Date().toLocaleDateString();
    let alert = this.alertCtrl.create({
      title: "Add Expense",
      inputs: [
        {
          name: "name",
          placeholder: "name"
        },
        {
          name: "date",
          value: now,
          type: "date"
        },
        {
          name: "installments",
          placeholder: "parcelas",
          type: "number"
        },
        {
          name: "value",
          placeholder: "value",
          type: "number"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel"
        },
        {
          text: "Add",
          handler: data => {
            let months: string[];
            expense = new Expense(
              0,
              data.name,
              data.date,
              cat.id,
              0,
              data.installments,
              data.value * 1
            );
            if (expense.isValid()) {
              this._monthSelectorProvider
                .setFrequency(new Date(data.date), data.installments)
                .then(items => {
                  expense.date = items;
                  this._expenseProvider
                    .saveItemLocal(expense)
                    .then(savedItem => {
                      this.showToast("Despesa Adcionada com sucesso");
                      this.loadLists();
                    })
                    .catch(err => console.log(err));
                });
            } else {
              this.showToast("Você precisa preencher todos os campos.");
            }
          }
        }
      ]
    });
    alert.present();
  }

  private showToast(text: string) {
    this.toastCtrl
      .create({
        message: text,
        duration: 3000
        // position: "middle",
        // showCloseButton: true,
        // closeButtonText: "Ok"
      })
      .present();
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
