import {UserPassword} from "../../modules/users/domain/userPassword";

describe('userPassword', () => {
  it('should be able to create and hash a valid password', async () => {
    const password = "validpassword"
    const userPassword = UserPassword.create(password);
    expect(userPassword).toBeInstanceOf(UserPassword);
    const hashed = await userPassword.getHash();
    expect(hashed).toBeTruthy();
    const doesMatch = await userPassword.compare(hashed)
    expect(doesMatch).toBe(true);
  });

  it('should throws an error when provided with invalid email', () => {
    expect(() => UserPassword.create("short")).toThrow();
  });
});
