import { checkPassword } from "@/utils/password";


describe("checkPassword", () => {
  it("should return true for a valid password", () => {
    expect(checkPassword("Password123!")).toBe(true);
  });

  it("should return false for a password with less than 8 characters", () => {
    expect(checkPassword("Pas123!")).toBe(false);
  });

  it("should return false for a password without a number", () => {
    expect(checkPassword("Password!")).toBe(false);
  });

  it("should return false for a password without a lowercase letter", () => {
    expect(checkPassword("PASSWORD123!")).toBe(false);
  });

  it("should return false for a password without an uppercase letter", () => {
    expect(checkPassword("password123!")).toBe(false);
  });

  it("should return false for a password without a special character", () => {
    expect(checkPassword("Password123")).toBe(false);
  });
});
