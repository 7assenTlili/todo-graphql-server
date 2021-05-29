import { ApolloServer } from 'apollo-server';
import typeDefs from "../../infrastructure/connection/http/typeDef";
import resolvers from "../../infrastructure/connection/http/resolvers";

// @ts-ignore
export default (context) => {
  return new ApolloServer({
    typeDefs,
    resolvers,
    context,
  });
};
