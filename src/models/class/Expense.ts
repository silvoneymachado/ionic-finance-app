import { Category } from "./Category";

export class Expense {
  constructor(
    public id: number,
    public name: string,
    public date: Date,
    public category: Category,
    public currentInstallment: number,
    public totalInstallment: number,
    public value: number
  ) {}
}
