import { checkPassword } from "@/utils/password";


describe("checkPassword", () => {
  it("all check should return true for a valid password", () => {
    expect(checkPassword("Password123!")).toStrictEqual({
      lengthCheck: true,
      numberCheck: true,
      lowerCaseCheck: true,
      upperCaseCheck: true,
      specialCharCheck: true,
    });
  });

  it("lengthCheck should return false for a password with less than 8 characters", () => {
    expect(checkPassword("Pas123!")).toStrictEqual({
      lengthCheck: false,
      numberCheck: true,
      lowerCaseCheck: true,
      upperCaseCheck: true,
      specialCharCheck: true,
    });
  });

  it("numberCheck should return false for a password without a number", () => {
    expect(checkPassword("Password!")).toStrictEqual({
      lengthCheck: true,
      numberCheck: false,
      lowerCaseCheck: true,
      upperCaseCheck: true,
      specialCharCheck: true,
    });
  });

  it("lowerCaseCheck hould return false for a password without a lowercase letter", () => {
    expect(checkPassword("PASSWORD123!")).toStrictEqual({
      lengthCheck: true,
      numberCheck: true,
      lowerCaseCheck: false,
      upperCaseCheck: true,
      specialCharCheck: true,
    
    });
  });

  it("upperCaseCheck should return false for a password without an uppercase letter", () => {
    expect(checkPassword("password123!")).toStrictEqual({
      lengthCheck: true,
      numberCheck: true,
      lowerCaseCheck: true,
      upperCaseCheck: false,
      specialCharCheck: true,
    
    });
  });

  it("specialCharCheck should return false for a password without a special character", () => {
    expect(checkPassword("Password123")).toStrictEqual({
      lengthCheck: true,
      numberCheck: true,
      lowerCaseCheck: true,
      upperCaseCheck: true,
      specialCharCheck: false,
    });
  });
});
