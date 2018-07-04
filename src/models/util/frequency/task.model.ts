import { Frequency, Expense, Duration } from "../../classes";

export class Task {
  constructor(
    private id: number,
    private name: string,
    private frequency: Frequency,
    private createdDate: Date = new Date(),
    private associatedExpenses: Array<Expense> = null,
    private done: boolean = false,
    private internalTasks: Array<Task> = new Array<Task>()
  ) {}

  getFrequency(): Frequency {
    return this.frequency;
  }

  getInternalTasks(): Array<Task> {
    return this.internalTasks;
  }

  update(): boolean {
    if (this.frequency.next()) {
      this.addInternalTask();
    } else {
      this.setAllDone();
      return false;
    }
    return true;
  }

  private addInternalTask(): void {
    let days: Array<number> = this.frequency.getInterval().getDaysBeteween();
    let id: number = 1;
    days.forEach(day => {
      let task: Task = this.createInternalTask(id, day);
      this.internalTasks.push(task);
      ++id;
    });
  }

  private createInternalTask(id: number, day: number): Task {
    let frequency: Frequency = new Frequency(
      id,
      this.frequency.getInterval(day),
      this.frequency.getTimeInterval(),
      Duration.FOR_A_NUMBER_OF_TIMES,
      0
    );
    return new Task(0, this.name, frequency);
  }

  hasInternalTasks(): boolean {
    return this.internalTasks.length > 0;
  }

  isDone(): boolean {
    if (!this.hasInternalTasks()) {
      return this.done;
    } else {
      let done: boolean = true;

      this.internalTasks.forEach(task => {
        if (!task.isDone()) done = false;
      });

      if (done === true) return true;
      else return false;
    }
  }

  private setDone(done: boolean = true): void {
    this.done = done;
  }

  private setAllInternalDone(done: boolean = true): void {
    if (this.hasInternalTasks()) {
      this.internalTasks.forEach(task => {
        task.setDone(done);
      });
    }
  }

  private setAllDone(done: boolean = true): void {
    this.setAllInternalDone(done);
    this.setDone(done);
  }
}
