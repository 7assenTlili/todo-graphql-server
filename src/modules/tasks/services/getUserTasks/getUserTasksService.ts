import {GetUserTasksDTO} from "./getUserTasksDTO";
import {Task} from "../../domain/task";
import taskRepo from "../../../../infrastructure/repositories/tasks";

export const getUserTasks = (input: GetUserTasksDTO): Promise<Task[]> => {
  const { userId, limit, skip } = input;

  return taskRepo.getTasksByUserId(userId, {limit, skip});
}
