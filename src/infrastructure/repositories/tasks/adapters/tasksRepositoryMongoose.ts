import { getModelForClass } from "@typegoose/typegoose";
import { ITasksRepository } from "../tasksRepository";
import { Task } from "../../../../modules/tasks/domain/task";
import {ObjectId} from "mongoose";
import {EditTaskDTO} from "../../../../modules/tasks/services/editTask/editTaskDTO";
import {PaginationDTO} from "../../../../shared/paginationDTO";

const TaskModel = getModelForClass(Task);

export class TasksRepositoryMongoose implements ITasksRepository {
  async doesExist(id: string): Promise<boolean> {
    const task = await TaskModel.findOne({ id }).lean().exec();
    return !!task;
  }

  save(task: Task): Promise<Task> {
    const newTask = new TaskModel(task);

    return newTask.save();
  }

  getTaskById(id: string): Promise<Task> {
    // @ts-ignore
    return TaskModel.findOne({ _id: id }).populate("user").lean().exec();
  }

  getTasksByUserId(userId: string, pagination: PaginationDTO): Promise<Task[]> {
    const { limit = 0, skip = 0 } = pagination;
    // @ts-ignore
    return TaskModel.find({ user: userId}).limit(limit).skip(skip).populate("user").lean().exec();
  }

  getTasksBySharedUserId(userId: string, pagination: PaginationDTO): Promise<Task[]> {
    const { limit = 0, skip = 0 } = pagination;
    // @ts-ignore
    return TaskModel.find({ sharedWith: userId}).limit(limit).skip(skip).populate("user").lean().exec();
  }

  update(id: string, input: Task): Promise<Task> {
    const filter = {
      _id: id
    };
    const options = {
      new: true
    }
    // @ts-ignore
    return TaskModel.findOneAndUpdate(filter, input, options).populate("user").lean().exec();
  }

  delete(id: string): Promise<Task> {
    // @ts-ignore
    return TaskModel.findOneAndDelete({_id: id}).populate("user").lean().exec();
  }

  share(id: string, userID: string): Promise<Task> {
    const filter = {
      _id: id
    };
    const options = {
      new: true
    }
    const update = {
      $addToSet: { sharedWith: userID }
    }
    // @ts-ignore
    return TaskModel.findOneAndUpdate(filter, update, options).populate("user").lean().exec();
  }
}
