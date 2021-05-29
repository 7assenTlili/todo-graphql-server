import { Task } from "../../../modules/tasks/domain/task";
import {EditTaskDTO} from "../../../modules/tasks/services/editTask/editTaskDTO";

export interface ITasksRepository {
  doesExist(id: string): Promise<boolean>;
  save(task: Task): Promise<Task>;
  getTaskById(id: string): Promise<Task>;
  getTasksByUserId(userId: string, pagination: any): Promise<Task[]>;
  getTasksBySharedUserId(userId: string, pagination: any): Promise<Task[]>;
  delete(id: string): Promise<Task>;
  update(id: string, input: Task): Promise<Task>;
  share(id: string, userID: string): Promise<Task>;
}
