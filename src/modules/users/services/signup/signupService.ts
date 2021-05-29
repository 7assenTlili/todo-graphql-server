import {SignupDTO} from "./signupDTO";
import userRepo from "../../../../infrastructure/repositories/users";
import {UserEmail} from "../../domain/userEmail";
import {UserPassword} from "../../domain/userPassword";
import {UserName} from "../../domain/userName";

export const signup = async (user: SignupDTO) => {
  const email = UserEmail.create(user.email);
  const password = UserPassword.create(user.password);
  const username = UserName.create(user.username);

  const alreadyExists = await userRepo.doesExist(email.value);
  if (alreadyExists) {
    throw new Error("Already exists")
  }

  try {
    return await userRepo.save({username: username.value, password: await password.getHash(), email: email.value });
  } catch (e) {
    throw new Error("Unexpected error")
  }
}
