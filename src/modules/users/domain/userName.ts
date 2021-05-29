// @ts-ignore
import {Guard} from "../../../shared/guard";
import config from "../../../config";

interface IUserNameProps {
  value: string
}

export class UserName {
  public props: IUserNameProps
  public static minLength: number = config.MIN_USERNAME_LENGTH;
  public static maxLength: number = config.MAX_USERNAME_LENGTH;

  constructor(props: IUserNameProps) {
    this.props = props;
  }

  get value (): string {
    return this.props.value
  }

  public static create(name: string): UserName {
    const { success: isValidMinLength } = Guard.againstMinLength(name, this.minLength);
    const { success: isValidMaxLength } = Guard.againstMaxLength(name, this.maxLength);
    if (!isValidMinLength) {
      throw new Error(`INVALID_USERNAME: should be at least ${this.minLength} characters`);
    } else if (!isValidMaxLength) {
      throw new Error(`INVALID_USERNAME: should be at least ${this.maxLength} characters`);
    } else {
      return new UserName({value: name});
    }
  }
}
