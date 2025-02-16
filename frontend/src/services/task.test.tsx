import fetchMock from "jest-fetch-mock";
import {
    deleteAllRequest,
    deleteTaskRequest,
    retrieveTasksRequest,
    modifyTaskRequest,
    createTaskRequest,
} from "./task";

describe("Task Service", () => {
    beforeEach(() => {
        fetchMock.resetMocks();
        jest.clearAllMocks();
        jest.spyOn(console, "error").mockImplementation(() => {});
    });

    describe("deleteAllRequest", () => {
        it("should return true if all tasks are deleted successfully", async () => {
            fetchMock.mockResponseOnce("", { status: 200 });
            jest.spyOn(localStorage, "getItem").mockReturnValue("mock-token");

            const result = await deleteAllRequest();
            expect(result).toBe(true);
        });

        it("should return false if there is an error", async () => {
            fetchMock.mockResponseOnce("", { status: 500 });
            jest.spyOn(localStorage, "getItem").mockReturnValue("mock-token");

            const result = await deleteAllRequest();
            expect(result).toBe(false);
        });
    });

    describe("deleteTaskRequest", () => {
        it("should return true if a task is deleted successfully", async () => {
            fetchMock.mockResponseOnce("", { status: 200 });
            jest.spyOn(localStorage, "getItem").mockReturnValue("mock-token");

            const result = await deleteTaskRequest("123");
            expect(result).toBe(true);
        });

        it("should return false if there is an error", async () => {
            fetchMock.mockResponseOnce("", { status: 500 });
            jest.spyOn(localStorage, "getItem").mockReturnValue("mock-token");

            const result = await deleteTaskRequest("123");
            expect(result).toBe(false);
        });
    });

    describe("deleteTaskRequest Integration Test", () => {
        it("should create a task and then delete it successfully", async () => {
            // Mock the creation of a task
            const mockTask = {
                description: "Temporary Task",
                color: "green",
                _id: "temp-id",
                isChecked: false,
            };
            fetchMock.mockResponses(
                [
                    JSON.stringify(mockTask), // Response for createTaskRequest
                    { status: 200 },
                ],
                [
                    "", // Response for deleteTaskRequest
                    { status: 200 },
                ]
            );

            jest.spyOn(localStorage, "getItem").mockReturnValue("mock-token");

            // Create the task
            const createdTask = await createTaskRequest("Temporary Task", "green");
            expect(createdTask).toEqual(mockTask);

            // Delete the task
            const deleteResult = await deleteTaskRequest(mockTask._id);
            expect(deleteResult).toBe(true);

            // Check if the correct requests were made
            expect(fetchMock).toHaveBeenCalledWith(
                expect.stringContaining("/api/management/createTask"), // URL for task creation
                expect.objectContaining({
                    method: "POST",
                    body: JSON.stringify({
                        description: "Temporary Task",
                        color: "green",
                        isChecked: false,
                    }),
                    headers: expect.objectContaining({
                        Authorization: "Bearer mock-token",
                        "Content-Type": "application/json",
                    }),
                })
            );

            expect(fetchMock).toHaveBeenCalledWith(
                expect.stringContaining(`/api/management/deleteOneTask/${mockTask._id}`), // URL for task deletion
                expect.objectContaining({
                    method: "DELETE",
                    headers: expect.objectContaining({
                        Authorization: "Bearer mock-token",
                        "Content-Type": "application/json",
                    }),
                })
            );
        });
    });

    describe("retrieveTasksRequest", () => {
        it("should return tasks if retrieved successfully", async () => {
            const mockTasks = [{ description: "Task 1", color: "red", _id: "1", isChecked: false }];
            fetchMock.mockResponseOnce(JSON.stringify(mockTasks), { status: 200 });
            jest.spyOn(localStorage, "getItem").mockReturnValue("mock-token");

            const result = await retrieveTasksRequest("user1");
            expect(result).toEqual(mockTasks);
        });

        it("should return null if there is an error", async () => {
            fetchMock.mockResponseOnce(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
            jest.spyOn(localStorage, "getItem").mockReturnValue("mock-token");

            const result = await retrieveTasksRequest("user1");
            expect(result).toBeNull();
        });
    });

    describe("modifyTaskRequest", () => {
        it("should return true if a task is modified successfully", async () => {
            fetchMock.mockResponseOnce("", { status: 200 });
            jest.spyOn(localStorage, "getItem").mockReturnValue("mock-token");

            const result = await modifyTaskRequest("123", true, "New description");
            expect(result).toBe(true);
        });

        it("should return false if there is an error", async () => {
            fetchMock.mockResponseOnce("", { status: 500 });
            jest.spyOn(localStorage, "getItem").mockReturnValue("mock-token");

            const result = await modifyTaskRequest("123", true, "New description");
            expect(result).toBe(false);
        });
    });

    describe("modifyTaskRequest Integration Test", () => {
        it("should create a task, modify it, and confirm the modification", async () => {
            // Mock the creation of a task
            const mockTask = {
                description: "Temporary Task",
                color: "green",
                _id: "temp-id",
                isChecked: false,
            };

            const modifiedTask = {
                ...mockTask,
                description: "Modified Task",
                isChecked: true,
            };

            fetchMock.mockResponses(
                [
                    JSON.stringify(mockTask), // Response for createTaskRequest
                    { status: 200 },
                ],
                [
                    JSON.stringify(modifiedTask), // Response for modifyTaskRequest
                    { status: 200 },
                ]
            );

            jest.spyOn(localStorage, "getItem").mockReturnValue("mock-token");

            // Create the task
            const createdTask = await createTaskRequest("Temporary Task", "green");
            expect(createdTask).toEqual(mockTask);

            // Modify the task
            const modifyResult = await modifyTaskRequest(mockTask._id, true, "Modified Task");
            expect(modifyResult).toBe(true);

            // Check if the correct requests were made for creation
            expect(fetchMock).toHaveBeenCalledWith(
                expect.stringContaining("/api/management/createTask"),
                expect.objectContaining({
                    method: "POST",
                    body: JSON.stringify({
                        description: "Temporary Task",
                        color: "green",
                        isChecked: false,
                    }),
                    headers: expect.objectContaining({
                        Authorization: "Bearer mock-token",
                        "Content-Type": "application/json",
                    }),
                })
            );

            // Check if the correct requests were made for modification
            expect(fetchMock).toHaveBeenCalledWith(
                expect.stringContaining(`/api/management/modifyTask/${mockTask._id}`),
                expect.objectContaining({
                    method: "PUT",
                    body: JSON.stringify({
                        description: "Modified Task",
                        isChecked: true,
                    }),
                    headers: expect.objectContaining({
                        Authorization: "Bearer mock-token",
                        "Content-Type": "application/json",
                    }),
                })
            );
        });
    });

    describe("createTaskRequest", () => {
        it("should return the new task if created successfully", async () => {
            const mockTask = { description: "New Task", color: "blue", _id: "1", isChecked: false };
            fetchMock.mockResponseOnce(JSON.stringify(mockTask), { status: 200 });
            jest.spyOn(localStorage, "getItem").mockReturnValue("mock-token");

            const result = await createTaskRequest("New Task", "blue");
            expect(result).toEqual(mockTask);
        });

        it("should return null if there is an error", async () => {
            fetchMock.mockResponseOnce(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
            jest.spyOn(localStorage, "getItem").mockReturnValue("mock-token");

            const result = await createTaskRequest("New Task", "blue");
            expect(result).toBeNull();
        });
    });
});
