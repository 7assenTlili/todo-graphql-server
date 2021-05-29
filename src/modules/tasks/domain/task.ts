import {prop, Ref} from "@typegoose/typegoose";
import {User} from "../../users/domain/user";

export class Task {
  readonly _id?: string;

  @prop()
  title: string;

  @prop()
  description: string;

  @prop({ default: false })
  isComplete?: boolean;

  @prop({ ref: "User" })
  user?: Ref<User>

  @prop({ ref: "User" })
  sharedWith?: Ref<User>[]
}
