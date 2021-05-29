import {GetUserTasksDTO} from "../getUserTasks/getUserTasksDTO";
import {Task} from "../../domain/task";
import taskRepo from "../../../../infrastructure/repositories/tasks";

export const getUserSharedTasks = (input: GetUserTasksDTO): Promise<Task[]> => {
  const { userId, limit, skip } = input;

  return taskRepo.getTasksBySharedUserId(userId, {limit, skip});
}
