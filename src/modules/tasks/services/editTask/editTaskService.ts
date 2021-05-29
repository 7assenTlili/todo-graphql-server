import {EditTaskDTO} from "./editTaskDTO";
import {Task} from "../../domain/task";
import taskRepo from "../../../../infrastructure/repositories/tasks";

export const editTask = (id: string, input: EditTaskDTO): Promise<Task> => {
  try {
    return taskRepo.update(id, input);
  } catch (e) {
    throw new Error("UNEXPECTED_ERROR");
  }
}
