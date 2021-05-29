import { createTestClient } from "apollo-server-testing";
import gql from "graphql-tag";
import constructTestServer from "./constructTestServer";
import { closeDatabase, clearDatabase, connect, populateDatabase } from "../e2e/dbUtils";
import {getModelForClass} from "@typegoose/typegoose";
import {Task} from "../../modules/tasks/domain/task";
import {User} from "../../modules/users/domain/user";

beforeAll(async () => {
  await connect()

  const TaskModel = getModelForClass(Task);
  const UserModel = getModelForClass(User);

  await populateDatabase(TaskModel, [
    {
      _id: "60b0c3bc8cb1ea51949339e0",
      title: "abcd",
      description: "description test",
      user: "60b09157c813ff0f9c3b5569",
      sharedWith: [],
      isComplete: false
    },
    {
      _id: "60b0e0bcc672e602ac2f705e",
      title: "task2",
      description: "description test",
      user: "60a0c7d67883212b4c0f6bcc",
      sharedWith: [],
      isComplete: false
    },
    {
      _id: "60b0f43e23e5984df8a6fb8e",
      title: "task 4",
      description: "description test",
      user: "60a0c7d67883212b4c0f6bcc",
      sharedWith: ["60b09157c813ff0f9c3b5569"],
      isComplete: false
    },
    {
      _id: "60b15f1ee030c4362cdd7ff8",
      title: "to delete",
      description: "description test",
      user: "60b09157c813ff0f9c3b5569",
      sharedWith: [],
      isComplete: false
    },
  ]);

  await populateDatabase(UserModel, [
    {
      _id: "60b09157c813ff0f9c3b5569",
      email: "email@email.com",
      username: "hassen",
      password: "ncsjdcjs"
    },
    {
      _id: "60a0c7d67883212b4c0f6bcc",
      email: "user2@email.com",
      username: "user2",
      password: "ncsjdcjs"
    },
  ]);
});

afterAll(async (done) => {
  await clearDatabase();
  await closeDatabase();
  done();
});

describe("Tasks", () => {
  it("should return a user's own task", async () => {
    const server = constructTestServer({ user: {
      _id: "60b09157c813ff0f9c3b5569"
    }});

    // @ts-ignore
    const { query } = createTestClient(server);

    const GET_TASK = gql`
        {
            task(_id:"60b0c3bc8cb1ea51949339e0") {
                _id
                title
                user {
                    _id
                    email
                    username
                }
                sharedWith
            }
        }
    `;
    const res = await query({
      query: GET_TASK
    });

    expect(res).toMatchSnapshot();
  });

  it('should not return other user\'s task', async () => {
    const server = constructTestServer({ user: {
        _id: "60b09157c813ff0f9c3b5569"
      }});

    // @ts-ignore
    const { query } = createTestClient(server);

    const GET_TASK = gql`
        {
            task(_id:"60b0e0bcc672e602ac2f705e") {
                _id
                title
                user {
                    _id
                    email
                    username
                }
                sharedWith
            }
        }
    `;
    const res = await query({
      query: GET_TASK
    });

    expect(res).toMatchSnapshot();
  });

  it('should return a shared task', async () => {
    const server = constructTestServer({ user: {
        _id: "60b09157c813ff0f9c3b5569"
      }});

    // @ts-ignore
    const { query } = createTestClient(server);

    const GET_TASK = gql`
        {
            task(_id:"60b0f43e23e5984df8a6fb8e") {
                _id
                title
                user {
                    _id
                    email
                    username
                }
                sharedWith
            }
        }
    `;
    const res = await query({
      query: GET_TASK
    });

    expect(res).toMatchSnapshot();
  });

  it('should be able to create a task', async () => {
    const server = constructTestServer({ user: {
        _id: "60b09157c813ff0f9c3b5569"
      }});

    // @ts-ignore
    const { query } = createTestClient(server);

    const GET_TASK = gql`
        mutation {
            createTask(input: {
                title: "new Task"
                description:"description"
            }) {
                _id
                title
                description
                isComplete
                user {
                    _id
                }
                sharedWith
            }
        }
    `;
    const res = await query({
      query: GET_TASK
    });

    expect(res).toMatchSnapshot();
  });

  it('should be able to delete his own task', async () => {
    const server = constructTestServer({ user: {
        _id: "60b09157c813ff0f9c3b5569"
      }});

    // @ts-ignore
    const { query } = createTestClient(server);

    const GET_TASK = gql`
        mutation {
            deleteTask(id: "60b15f1ee030c4362cdd7ff8") {
                _id
                user {
                    email
                }
            }
        }
    `;
    const res = await query({
      query: GET_TASK
    });

    expect(res).toMatchSnapshot();
  });

  it('should not be able to delete shared task', async () => {
    const server = constructTestServer({ user: {
        _id: "60b09157c813ff0f9c3b5569"
      }});

    // @ts-ignore
    const { query } = createTestClient(server);

    const GET_TASK = gql`
        mutation {
            deleteTask(id: "60b0f43e23e5984df8a6fb8e") {
                _id
                user {
                    email
                }
            }
        }
    `;
    const res = await query({
      query: GET_TASK
    });

    expect(res).toMatchSnapshot();
  });
});
