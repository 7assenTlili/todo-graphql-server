import {Guard} from "../../../shared/guard";

interface IUserEmailProps {
  value: string;
}

export class UserEmail {
  public props: IUserEmailProps

  constructor(props: IUserEmailProps) {
    this.props = props;
  }

  get value () : string {
    return this.props.value;
  }

  private static format(email: string): string {
    return email.trim().toLowerCase();
  }

  public static create(email: string): UserEmail {
    const { success: isValidEmail } = Guard.againstInvalidEmail(email)
    if (!isValidEmail) {
      throw new Error("INVALID_EMAIL")
    } else {
      return new UserEmail({value: this.format(email)});
    }
  }
}
