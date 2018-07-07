import { Category } from "./Category";

export class Expense {
  public maturity: Date;
  constructor(
    public id: number,
    public name: string,
    public date: string[],
    public idCategory: number,
    public currentInstallment: number,
    public totalInstallment: number,
    public value: number
  ) {}

  public isValid(): boolean {
    if (
      this.name == "" ||
      this.totalInstallment == undefined ||
      this.totalInstallment == null ||
      this.value == undefined ||
      this.value == null
    ) {
      return false;
    } else {
      return true;
    }
  }
}
