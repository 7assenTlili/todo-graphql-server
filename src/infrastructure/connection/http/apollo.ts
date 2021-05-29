import { ApolloServer, gql } from 'apollo-server';
import typeDefs from "./typeDef";
import {signup} from "../../../modules/users/services/signup/signupService";
import {login} from "../../../modules/users/services/login/loginService";
import {decode, JWTClaims} from "../../../modules/users/services/jwt/jwtServices";
import {ensureIsAuthenticated, getUserTaskRelation} from "./utils";
import {createTask} from "../../../modules/tasks/services/createTask/createTaskService";
import {getTask} from "../../../modules/tasks/services/getTask/getTaskService";
import {getUserTasks} from "../../../modules/tasks/services/getUserTasks/getUserTasksService";
import {getUserSharedTasks} from "../../../modules/tasks/services/getUserSharedTasks/getUserSharedTasks";
import {editTask} from "../../../modules/tasks/services/editTask/editTaskService";
import {shareTask} from "../../../modules/tasks/services/shareTask/shareTaskService";
import resolvers from "./resolvers";

// @ts-ignore
const context = async ({ req }) => {
  const token = req.headers.authorization || '';

  const user = await decode(token);

  return { user }
}

const initApollo = () => {
  return new ApolloServer({
    typeDefs,
    resolvers,
    context
  });
}

export default initApollo;
