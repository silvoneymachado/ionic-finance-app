import { DE_1_A_9, DIA_10_MENSALMENTE } from "./frequency.mock";
import { Task } from "../frequency/task.model";

let task1: Task = new Task(
  1,
  "Confirma quanto dinheiro entrou",
  DIA_10_MENSALMENTE
);

export const MONTHLY_TASKS: Array<Task> = [
  new Task(1, "Confirma quanto dinheiro entrou", DE_1_A_9),
  new Task(2, "Ir ao banco", DE_1_A_9),
  new Task(3, "Separar dinheiro", DIA_10_MENSALMENTE)
];

// console.log(task1);
// console.log('');
// console.log('has internal tasks = ' + task1.hasInternalTasks());
// console.log('');
// console.log('done = ' + task1.isDone());
// console.log('');
// console.log('update = ' + task1.update());
// console.log('');
// task1.getInternalTasks().forEach(internalTask => {
//     console.log(internalTask.getFrequency());
// });
// console.log('');
// console.log('has internal tasks = ' + task1.hasInternalTasks());
// console.log('');
// // console.log(task1);
// console.log('');
// console.log('done = ' + task1.isDone());
// console.log('');
// console.log('update = ' + task1.update());
// console.log('');
// console.log('');
// // console.log(task1);
// task1.getInternalTasks().forEach(internalTask => {
//     console.log(internalTask.getFrequency());
// });
// console.log('');
// console.log('done = ' + task1.isDone());
// console.log('');
