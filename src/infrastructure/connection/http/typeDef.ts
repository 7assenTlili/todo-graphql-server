import {gql} from "apollo-server";

const typeDefs = gql`
    type User {
        _id: ID!
        email: String!
        username: String!
    }

    type Token {
        token: String!
    }

    type Task {
        _id: ID!
        title: String!
        description: String
        isComplete: Boolean
        user: User!
        sharedWith: [String]
    }

    input UserInput {
        email: String
        username: String
        password: String
    }

    input TaskInput {
        title: String!
        description: String
    }

    input EditTaskInput {
        title: String
        description: String
        isComplete: Boolean
    }

    type Mutation {
        signup(input: UserInput): User
        login(email: String!, password: String): Token!
        createTask(input: TaskInput): Task!
        editTask(id: ID!, input: EditTaskInput!): Task!
        deleteTask(id: ID!): Task!
        shareTask(id: ID!, userId: ID!): Task!
    }

    type Query {
        task(_id: ID!): Task!
        tasks(limit: Int, skip: Int): [Task]!
        sharedTasks(limit: Int, skip: Int): [Task]!
    }
`;

export default typeDefs;
