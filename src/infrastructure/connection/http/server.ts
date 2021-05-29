import initMongoose from "../database/mongoose";
import initApollo from "./apollo";

const startGraphqlServer = async () => {
  await initMongoose();

  const server = initApollo();

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

export default startGraphqlServer;
