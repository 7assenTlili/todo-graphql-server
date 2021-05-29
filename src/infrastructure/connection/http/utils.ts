import { AuthenticationError } from "apollo-server"
import {Task} from "../../../modules/tasks/domain/task";
import {JWTClaims} from "../../../modules/users/services/jwt/jwtServices";
import {ObjectId} from "mongoose";

export const ensureIsAuthenticated = (context: any) => {
  if (!context.user) {
    throw new AuthenticationError("NOt logged in")
  }
}

const isOwner = (task: any, user: JWTClaims) => task.user._id.toString() === user._id;

const isSharedWith = (task: any, user: JWTClaims) => {
  let clone: string[] = [];
  if (task.sharedWith) {
    clone = task.sharedWith.map((elm: ObjectId) => elm.toString());
  }
  return clone.includes(user._id);
}

export const getUserTaskRelation = (task: Task, context: any) => {
  const { user } = context;

  if (isOwner(task, user)) return "OWNER";
  if (isSharedWith(task, user)) return "SHARED";

  throw new Error("NOT_AUTHORIZED");
}

