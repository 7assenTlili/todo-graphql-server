import {HttpLink} from "apollo-link-http";
import fetch from "node-fetch";
import {execute} from "apollo-link";

export default async (server: any) => {
  const httpServer = await server.listen({ port: 0 });

  const link = new HttpLink({
    uri: `http://localhost:${httpServer.port}`,
    fetch,
  });

  // @ts-ignore
  const executeOperation = ({ query, variables = {} }) =>
    execute(link, { query, variables });

  return {
    link,
    stop: () => httpServer.server.close(),
    graphql: executeOperation,
  };
};
