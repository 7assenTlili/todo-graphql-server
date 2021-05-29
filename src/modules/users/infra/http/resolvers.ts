import {signup} from "../../services/signup/signupService";
import {login} from "../../services/login/loginService";
import {SignupDTO} from "../../../../infrastructure/connection/http/dto/signupDTO";

export default {
  Mutation: {
    signup: (_: any, args: SignupDTO) => {
      return signup(args.input)
    },
    login: (_: any, args: {email: string, password: string}) => {
      return login(args);
    },
  },
}
