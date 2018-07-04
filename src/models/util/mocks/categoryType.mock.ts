import { CategoryType } from "../../classes";

export const EXPENSES: CategoryType[] = [
  { id: 1, value: "creditCard" },
  { id: 2, value: "fixedExpenditure" },
  { id: 3, value: "transport" },
  { id: 4, value: "food" },
  { id: 5, value: "market" }
];

export const INCOMES: CategoryType[] = [
  { id: 1, value: "salary" },
  { id: 2, value: "exchange" },
  { id: 3, value: "freelance" },
  { id: 4, value: "rental" },
  { id: 5, value: "bankAccount" }
];

/*
importa o EXPENSES e o INCOMES, E ACESSA COM:

let categoryType: CategoryType = EXPENSES[0]; // ''  { id: 1, value: 'bankAccount' }
*/
