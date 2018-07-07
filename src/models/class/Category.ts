import { Expense, CategoryType } from "../classes";

export class Category {
  public expense: Expense[] = [];
  constructor(
    public id: number,
    public name: string,
    public maturity: Date,
    public isCreditCard: boolean,
    public expanded: boolean
  ) {}

  public set total(n: number) {
    this.total += n * 1;
  }

  public set categoryType(type: CategoryType) {
    this.categoryType = type;
  }
}
