import { CategoryType } from "../../classes";

export const EXPENSE: CategoryType = new CategoryType(1, "expense");

export const INCOME: CategoryType = new CategoryType(2, "income");

/*
importa o EXPENSES e o INCOMES, E ACESSA COM:

let categoryType: CategoryType = EXPENSES[0]; // ''  { id: 1, value: 'bankAccount' }
*/
