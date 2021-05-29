// @ts-ignore
import * as bcrypt from "bcrypt-nodejs";
import {Guard} from "../../../shared/guard";
import config from "../../../config";

interface IUserPasswordProps {
  value: string
}

export class UserPassword {
  public props: IUserPasswordProps
  public static minLength: number = config.MIN_PASSWORD_LENGTH;

  constructor(props: IUserPasswordProps) {
    this.props = props;
  }

  public getHash(): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(this.props.value, null, null, (err: any, hash: string) => {
        if (err) return reject(err);
        return resolve(hash);
      })
    })
  }

  private bcryptCompare (plainText: string, hashed: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plainText, hashed, (err: any, compareResult: boolean) => {
        if (err) return resolve(false);
        return resolve(compareResult);
      })
    })
  }

  public async compare(hash: string): Promise<boolean> {
    return this.bcryptCompare(this.props.value, hash);
  }

  public static create(password: string): UserPassword {
    const { success: isValidLength } = Guard.againstMinLength(password, this.minLength);
    if (!isValidLength) {
      throw new Error(`INVALID_PASSWORD: should be at least ${this.minLength} characters`);
    } else {
      return new UserPassword({value: password});
    }
  }
}
