import { User } from "../../../modules/users/domain/user";

export interface IUsersRepository {
  doesExist (email: string): Promise<boolean>;
  save (user: User): Promise<User | void>;
  getUserByEmail (email: string): Promise<User|null>;
}
