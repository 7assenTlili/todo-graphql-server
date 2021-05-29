import {Task} from "../../domain/task";
import taskRepo from "../../../../infrastructure/repositories/tasks";

export const deleteTask = (id: string): Promise<Task> => {
  return taskRepo.delete(id);
}
