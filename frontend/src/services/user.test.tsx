import fetchMock from "jest-fetch-mock";
import { retrieveUserRequest, createAccountRequest, hasAccountCheckRequest, isLoginSuccessfulRequest } from "./user";

describe("User Service", () => {
    beforeEach(() => {
        fetchMock.resetMocks();
        jest.clearAllMocks();
        jest.spyOn(console, "error").mockImplementation(() => {});
        jest.spyOn(console, "log").mockImplementation(() => {});
    });

    describe("retrieveUserRequest", () => {
        it("should return user data if retrieved successfully", async () => {
            const mockUser = { name: "John Doe", email: "john@example.com" };
            fetchMock.mockResponseOnce(JSON.stringify(mockUser), { status: 200 });

            const result = await retrieveUserRequest("user123");
            expect(result).toEqual(mockUser);

            expect(fetchMock).toHaveBeenCalledWith(
                expect.stringContaining("/api/auth/getUser/user123"),
                expect.objectContaining({
                    method: "GET",
                })
            );
        });

        it("should return null if there is an error", async () => {
            fetchMock.mockResponseOnce("", { status: 500 });

            const result = await retrieveUserRequest("user123");
            expect(result).toBeNull();
        });
    });

    describe("createAccountRequest", () => {
        it("should create an account and return the user data", async () => {
            const mockUser = { name: "John Doe", email: "john@example.com" };
            const signupData = {
                name: "John Doe",
                email: "john@example.com",
                password: "password123",
            };

            fetchMock.mockResponseOnce(JSON.stringify(mockUser), { status: 200 });

            const result = await createAccountRequest(signupData);
            expect(result).toEqual(mockUser);

            expect(fetchMock).toHaveBeenCalledWith(
                expect.stringContaining("/api/auth/signup"),
                expect.objectContaining({
                    method: "POST",
                    body: JSON.stringify(signupData),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
            );
        });

        it("should return null if there is an error", async () => {
            fetchMock.mockResponseOnce("", { status: 500 });

            const result = await createAccountRequest({
                name: "John Doe",
                email: "john@example.com",
                password: "password123",
            });
            expect(result).toBeNull();
        });
    });

    describe("hasAccountCheckRequest", () => {
        it("should return true if the email is associated with an account", async () => {
            fetchMock.mockResponseOnce("", { status: 200 });

            const result = await hasAccountCheckRequest("john@example.com");
            expect(result).toBe(true);

            expect(fetchMock).toHaveBeenCalledWith(
                expect.stringContaining("/api/auth/checkingEmail"),
                expect.objectContaining({
                    method: "POST",
                    body: JSON.stringify({ email: "john@example.com" }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
            );
        });

        it("should return false if the email is not associated with an account", async () => {
            fetchMock.mockResponseOnce("", { status: 404 });

            const result = await hasAccountCheckRequest("john@example.com");
            expect(result).toBe(false);
        });
    });

    describe("isLoginSuccessfulRequest", () => {
        it("should return user data if login is successful", async () => {
            const mockUser = { name: "John Doe", email: "john@example.com" };
            const loginData = {
                email: "john@example.com",
                password: "password123",
            };

            fetchMock.mockResponseOnce(JSON.stringify(mockUser), { status: 200 });

            const result = await isLoginSuccessfulRequest(loginData);
            expect(result).toEqual(mockUser);

            expect(fetchMock).toHaveBeenCalledWith(
                expect.stringContaining("/api/auth/login"),
                expect.objectContaining({
                    method: "POST",
                    body: JSON.stringify(loginData),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
            );
        });

        it("should return null if login fails", async () => {
            fetchMock.mockResponseOnce("", { status: 401 });

            const result = await isLoginSuccessfulRequest({
                email: "john@example.com",
                password: "wrongpassword",
            });
            expect(result).toBeNull();
        });
    });
});
