import { TasksRepositoryMongoose } from "./adapters/tasksRepositoryMongoose";

const taskRepo = new TasksRepositoryMongoose();
export default taskRepo;
