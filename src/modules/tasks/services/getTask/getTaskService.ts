import {GetTaskDTO} from "./getTaskDTO";
import {Task} from "../../domain/task";
import taskRepo from "../../../../infrastructure/repositories/tasks";

export const getTask = (input: GetTaskDTO): Promise<Task> => {
  return taskRepo.getTaskById(input._id);
}
