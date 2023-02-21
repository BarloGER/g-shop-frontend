import { describe, test, expect } from "vitest";
import {
  registerUser,
  loginUser,
  getUser,
  deleteUser,
} from "../src/utils/auth";

// !IMPORTANT: Specific Joi errors etc. are tested in backend, due to limitations of possible connections per second to backend

describe("Tests authentication functions and user managment system with mock data", () => {
  let userToken, invalidToken, registerCredentials;

  invalidToken = "invalidToken";

  registerCredentials = {
    salutation: "Herr",
    firstname: "Max",
    lastname: "Mustermann",
    birth_date: "1992-01-01",
    email: "max.mustermann@example.com",
    password: "12345678",
    zip_code: "12345",
    city: "Berlin",
    street: "Musterstraße",
    street_number: "1a",
    country: "Deutschland",
    tel: "+491234567891",
  };

  describe("User registration", () => {
    test("should register user with valid credentials", async () => {
      const res = await registerUser(registerCredentials);
      expect(res.error).toBeUndefined();
      expect(res.data.token).toBeDefined();
    }, 60000);

    test("should fail with invalid credentials", async () => {
      const registerCredentials = {
        salutation: "Herr",
        firstname: "Max",
        lastname: "Mustermann",
        birth_date: "1992-01-01",
        email: "max.mustermann@example.com",
        password: "12345678",
        zip_code: "12345",
        city: "Berlin",
        street: "Musterstraße",
        street_number: "1a",
      };

      const res = await registerUser(registerCredentials);
      expect(res.errorCode).toEqual("Joi_001");
    });
  });

  describe("User login", () => {
    test("should login user with valid credentials", async () => {
      const loginCredentials = {
        email: "max.mustermann@example.com",
        password: "12345678",
      };

      const loginResponse = await loginUser(loginCredentials);
      expect(loginResponse.data.token).toBeDefined();
      userToken = loginResponse.data.token;
    });

    test("should fail with invalid email", async () => {
      const invalidCredentials = {
        email: "invalid.email@example.com",
        password: "12345678",
      };

      const loginResponse = await loginUser(invalidCredentials);
      expect(loginResponse.error).toEqual(
        "Es ist kein User mit dieser E-Mail registriert."
      );
      expect(loginResponse.errorType).toEqual("Not Found");
      expect(loginResponse.errorCode).toEqual("AUTH_002");
    });

    test("should fail with invalid password", async () => {
      const invalidCredentials = {
        email: "max.mustermann@example.com",
        password: "wrongpassword",
      };

      const loginResponse = await loginUser(invalidCredentials);
      expect(loginResponse.error).toEqual("Falsches Passwort");
      expect(loginResponse.errorType).toEqual("Unauthorized");
      expect(loginResponse.errorCode).toEqual("AUTH_003");
    });

    describe("Get user", () => {
      test("should get user data, if token is valid", async () => {
        const res = await getUser(userToken);
        expect(res.data.email).toEqual(registerCredentials.email);
      });

      test("should fail with invalid token", async () => {
        const res = await getUser(invalidToken);
        expect(res.error).toEqual("Ungültiger Token");
        expect(res.errorType).toEqual("Unauthorized");
        expect(res.errorCode).toEqual("AUTH_006");
      });
    });
  });

  describe("User deletion", () => {
    test("should delete user, if token is valid", async () => {
      const res = await deleteUser(userToken);
      expect(res.error).toBeUndefined();
      expect(res.data.message).toEqual("User erfolgreich gelöscht.");
    }, 60000);

    test("should fail with invalid token", async () => {
      const res = await deleteUser(invalidToken);
      expect(res.error).toEqual("Ungültiger Token");
      expect(res.errorType).toEqual("Unauthorized");
      expect(res.errorCode).toEqual("AUTH_006");
    });
  });
});
