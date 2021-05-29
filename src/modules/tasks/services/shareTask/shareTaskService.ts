import { Task } from "../../domain/task";
import taskRepo from "../../../../infrastructure/repositories/tasks";

export const shareTask = (taskID: string, userID: string): Promise<Task> => {
  return taskRepo.share(taskID, userID);
};
