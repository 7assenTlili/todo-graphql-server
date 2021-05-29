import {CreateTaskDTO} from "./createTaskDTO";
import {Task} from "../../domain/task";
import {TaskTitle} from "../../domain/taskTitle";
import taskRepo from "../../../../infrastructure/repositories/tasks";

export const createTask = (task: CreateTaskDTO): Promise<Task> => {
  const title = TaskTitle.create(task.title);

  try {
    // @ts-ignore
    return taskRepo.save({...task, title: title.value});
  } catch (e) {
    throw new Error("Unexpected error")
  }
}
