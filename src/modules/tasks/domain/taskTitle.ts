import {Guard} from "../../../shared/guard";
import config from "../../../config";

interface ITaskTitleProps {
  value: string
}

export class TaskTitle {
  public props: ITaskTitleProps
  public static minLength: number = config.MIN_TASK_TITLE_LENGTH;
  public static maxLength: number = config.MAX_TASK_TITLE_LENGTH;

  constructor(props: ITaskTitleProps) {
    this.props = props;
  }

  get value (): string {
    return this.props.value
  }

  public static create(name: string): TaskTitle {
    const { success: isValidMinLength } = Guard.againstMinLength(name, this.minLength);
    const { success: isValidMaxLength } = Guard.againstMaxLength(name, this.maxLength);
    if (!isValidMinLength) {
      throw new Error(`INVALID_USERNAME: should be at least ${this.minLength} characters`);
    } else if (!isValidMaxLength) {
      throw new Error(`INVALID_USERNAME: should be at least ${this.maxLength} characters`);
    } else {
      return new TaskTitle({value: name});
    }
  }
}
