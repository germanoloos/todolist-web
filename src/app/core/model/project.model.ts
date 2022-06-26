import { TaskModel } from "./task.model";

export interface ProjectModel {
  id: number;
  name: string;
  createdAt: Date;
  tasks: TaskModel[];
}
