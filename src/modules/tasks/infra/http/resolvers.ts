import {ensureIsAuthenticated, getUserTaskRelation} from "../../../../infrastructure/connection/http/utils";
import {createTask} from "../../services/createTask/createTaskService";
import {getTask} from "../../services/getTask/getTaskService";
import {editTask} from "../../services/editTask/editTaskService";
import {shareTask} from "../../services/shareTask/shareTaskService";
import {getUserTasks} from "../../services/getUserTasks/getUserTasksService";
import {getUserSharedTasks} from "../../services/getUserSharedTasks/getUserSharedTasks";
import {deleteTask} from "../../services/deleteTask/deleteTaskService";
import {CreateTaskDTO} from "../../../../infrastructure/connection/http/dto/createTaskDTO";
import {EditTaskDTO} from "../../../../infrastructure/connection/http/dto/editTaskDTO";

export default {
  Mutation: {
    createTask: async (_: any, args: CreateTaskDTO, context: any) => {
      ensureIsAuthenticated(context);
      // create a new task and get its id
      const { _id } = await createTask({...args.input, user: context.user._id});

      //return the created task with user populated
      // @ts-ignore
      return getTask({_id});
    },

    editTask: async (_: any, args: EditTaskDTO, context: any) => {
      const { id, input } = args;
      ensureIsAuthenticated(context);

      const task = await getTask({_id: id});
      if (!task) {
        throw new Error("TASK_NOT_FOUND");
      }

      getUserTaskRelation(task, context);

      return editTask(id, input);
    },

    deleteTask: async (_: any, args: { id: string}, context: any) => {
      const { id } = args;
      ensureIsAuthenticated(context);

      const task = await getTask({_id: id});
      if (!task) {
        throw new Error("TASK_NOT_FOUND");
      }

      const relation = getUserTaskRelation(task, context);
      if (relation === "OWNER") {
        return deleteTask(id);
      }

      throw new Error("NOT AUTHORIZED");
    },

    shareTask: async (_: any, args: { id: string, userId: string}, context: any) => {
      const { id, userId } = args;
      ensureIsAuthenticated(context);

      const task = await getTask({_id: id});
      if (!task) {
        throw new Error("TASK_NOT_FOUND");
      }

      const relation = getUserTaskRelation(task, context);
      if (relation === "OWNER") {
        return shareTask(id, userId);
      }

      throw new Error("NOT AUTHORIZED");
    },
  },
  Query: {
    task: async (_: any, args: {_id: string}, context: any) => {
      ensureIsAuthenticated(context);
      const task = await getTask(args);
      if (!task) {
        throw new Error("NOT_FOUND");
      }
      getUserTaskRelation(task, context);

      return task;
    },
    tasks: async (_: any, args: {limit: number, skip: number}, context: any) => {
      ensureIsAuthenticated(context);
      const input = {
        userId: context.user._id,
        limit: args.limit,
        skip: args.skip,
      }
      return getUserTasks(input);
    },
    sharedTasks: async (_: any, args: {limit: number, skip: number}, context: any) => {
      ensureIsAuthenticated(context);
      const input = {
        userId: context.user._id,
        limit: args.limit,
        skip: args.skip,
      }
      return getUserSharedTasks(input);
    },
  }
}
