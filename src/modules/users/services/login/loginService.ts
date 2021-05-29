import {LoginRequestDTO, LoginResponseDTO} from "./loginDTO";
import userRepo from "../../../../infrastructure/repositories/users";
import {UserEmail} from "../../domain/userEmail";
import {UserPassword} from "../../domain/userPassword";
import {sign} from "../jwt/jwtServices";

export const login = async (input: LoginRequestDTO): Promise<LoginResponseDTO> => {
  const email = UserEmail.create(input.email);
  const password = UserPassword.create(input.password);

  const user = await userRepo.getUserByEmail(email.value);
  const doesUserExists = !!user;

  if (!doesUserExists) {
    throw new Error("No User With this email was found");
  }

  // @ts-ignore
  // we can safely ignore this, because w already throw if user is null
  const isPasswordValid = password.compare(user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  // @ts-ignore
  const token = sign({ _id: user._id, email: user.email, username: user.username});

  return {token}
}
