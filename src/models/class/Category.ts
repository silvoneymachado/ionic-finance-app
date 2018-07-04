import { CategoryType } from "./CategoryType";

export class Category {
  constructor(
    public id: number,
    public name: string,
    public maturity: Date,
    public categoryType: CategoryType
  ) {}
}
