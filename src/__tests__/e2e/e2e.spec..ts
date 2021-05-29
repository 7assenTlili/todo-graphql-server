import { FetchResult, Observable, toPromise} from "apollo-link";
import initApollo from "../../infrastructure/connection/http/apollo";
import startTestServer from "./startTestServer";
import {connect, clearDatabase, closeDatabase} from "./dbUtils";
import {LOGIN_MUTATION, SIGNUP_MUTATION} from "./mutations";

beforeAll(async () => {
  await connect()
});

afterAll(async (done) => {
  await clearDatabase();
  await closeDatabase();
  done();
});

describe("server e2e", () => {
  let stop: { (): any; (): any; }, graphql: { (arg0: { query: any; variables: { pageSize: number; after: string; }; }): Observable<unknown>; ({ query, variables }: { query: any; variables?: {} | undefined; }): Observable<FetchResult<{ [key: string]: any; }, Record<string, any>, Record<string, any>>>; };

  beforeEach(async () => {
    const server = initApollo();
    const testServer = await startTestServer(server);
    stop = testServer.stop;
    graphql = testServer.graphql;
  });

  afterEach(() => stop());

  describe("User mutations", () => {
    it('should create a user document if input is valid', async () => {
      const res = await toPromise(
        graphql({
          query: SIGNUP_MUTATION,
          variables: {
            "input": {
              "email": "valid@email.com",
              "username": "hassen",
              "password": "123456789"
            }
          },
        }),
      );

      expect(res).toMatchSnapshot();
    });

    it('should not create a user document if email is invalid', async () => {
      const res = await toPromise(
        graphql({
          query: SIGNUP_MUTATION,
          variables: {
            "input": {
              "email": "invalid",
              "username": "hassen",
              "password": "123456789"
            }
          },
        }),
      );

      expect(res).toMatchSnapshot();
    });

    it('should not create a user document if username is invalid', async () => {
      const res = await toPromise(
        graphql({
          query: SIGNUP_MUTATION,
          variables: {
            "input": {
              "email": "valid@email.com",
              "username": "ha",
              "password": "123456789"
            }
          },
        }),
      );

      expect(res).toMatchSnapshot();
    });

    it('should not create a user document if password is invalid', async () => {
      const res = await toPromise(
        graphql({
          query: SIGNUP_MUTATION,
          variables: {
            "input": {
              "email": "valid@email.com",
              "username": "hassen",
              "password": "123"
            }
          },
        }),
      );

      expect(res).toMatchSnapshot();
    });

    it('should login if credentials are valid', async () => {
      const signup = await toPromise(
        graphql({
          query: SIGNUP_MUTATION,
          variables: {
            "input": {
              "email": "test@email.com",
              "username": "test",
              "password": "123456789"
            }
          },
        }),
      );

      const res = await toPromise(
        graphql({
          query: LOGIN_MUTATION,
          variables: {
            "email": "test@email.com",
            "password": "123456789"
          },
        }),
      );

      expect(res).toMatchSnapshot();
    });

    it('should not login if credentials are invalid', async () => {
      const signup = await toPromise(
        graphql({
          query: SIGNUP_MUTATION,
          variables: {
            "input": {
              "email": "test2@email.com",
              "username": "test",
              "password": "123456789"
            }
          },
        }),
      );

      const res = await toPromise(
        graphql({
          query: LOGIN_MUTATION,
          variables: {
            "email": "test2@email.com",
            "password": "123456"
          },
        }),
      );

      expect(res).toMatchSnapshot();
    });
  });
});
