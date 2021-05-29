interface IGuardResult {
  success: boolean;
}

export class Guard {
  public static againstInvalidEmail(email: string): IGuardResult {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return { success: re.test(email) };
  }

  public static againstMinLength(text: string, minLength: number): IGuardResult {
    return { success: text.length >= minLength }
  }

  public static againstMaxLength(text: string, minLength: number): IGuardResult {
    return { success: text.length <= minLength }
  }
}
