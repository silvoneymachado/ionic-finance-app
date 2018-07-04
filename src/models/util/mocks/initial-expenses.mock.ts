import { EXPENSES } from "./categoryType.mock";
import { Category, CategoryType, Expense } from "../../classes";

export const INITIAL_CATEGORIES: Category[] = [
  new Category(1, "Ouro Card", new Date("2018-07-16"), EXPENSES[0]),
  new Category(2, "Nubank", new Date("2018-07-28"), EXPENSES[0])
];

export const INITIAL_EXPENSES: Expense[] = [];
