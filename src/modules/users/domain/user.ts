import { prop } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

export class User {
  readonly _id?: ObjectId;

  @prop()
  username: string;

  @prop()
  email: string;

  @prop()
  password: string;
}
