import {UserEmail} from "../../modules/users/domain/userEmail";

describe('UserEmail', () => {
  it('should be able to create lowercase valid email when given a valid email', () => {
    const userEmail = UserEmail.create("vAlid@Email.Com");
    expect(userEmail).toBeInstanceOf(UserEmail);
    expect(userEmail.value).toBe("valid@email.com");
  });

  it('should throws an error when provided with invalid email', () => {
    expect(() => UserEmail.create("invalidvAlid@EmaiCom")).toThrow();
  });
});
