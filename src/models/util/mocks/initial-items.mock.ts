import { EXPENSE } from "./categoryType.mock";
import { Category, CategoryType, Expense, Revenue } from "../../classes";

let cat1, cat2: Category;
let exp1, exp2, exp3: Expense;
let income1, income2, income3: Revenue;

export const INITIAL_EXPENSES: Expense[] = [
  (this.exp1 = new Expense(1, "Anuidade", ["07/2018"], 1, 2, 3, 20)),
  (this.exp2 = new Expense(2, "Almoco", ["07/2018"], 1, 2, 1, 15)),
  (this.exp3 = new Expense(3, "Roupas", ["07/2018"], 2, 2, 3, 90))
];

export const INITIAL_CATEGORIES: Category[] = [
  (this.cat1 = new Category(
    1,
    "Ouro Card",
    new Date("2018/07/16"),
    true,
    false
  )),
  (this.cat2 = new Category(2, "Nubank", new Date("2018/07/28"), true, false))
];

export const INITIAL_INCOMES: Revenue[] = [(this.income1 = new Revenue())];
