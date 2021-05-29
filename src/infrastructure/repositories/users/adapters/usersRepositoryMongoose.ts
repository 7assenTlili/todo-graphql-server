import { getModelForClass } from "@typegoose/typegoose";
import { IUsersRepository } from "../usersRepository";
import { User } from "../../../../modules/users/domain/user";

const UserModel = getModelForClass(User);

export class UsersRepositoryMongoose implements IUsersRepository {
  async doesExist(email: string): Promise<boolean> {
    const user = await UserModel.findOne({ email }).lean().exec();
    return !!user;
  }

  async save(user: User): Promise<User | void> {
    const newUser = new UserModel(user);
    const doesExist = await this.doesExist(user.email);

    if (!doesExist) {
      return newUser.save();
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return  UserModel.findOne({ email }).lean().exec();
  }
}
