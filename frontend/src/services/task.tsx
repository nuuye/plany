const API_URL = "https://plany-backend.vercel.app/api/management";

interface Task {
    description: string;
    color: string;
    _id: string;
    isChecked: boolean;
}

// API request to delete all tasks
export const deleteAllRequest = async (): Promise<boolean> => {
    try {
        const token = localStorage.getItem("token"); // Récupérez le token depuis le localStorage
        if (!token) {
            console.error("Token not found in localStorage");
            return;
        }
        const response = await fetch(`${API_URL}/deleteAll`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};

//API request to delete a specific task
export const deleteTaskRequest = async (id: string): Promise<boolean> => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token not found in localStorage");
            return;
        }
        const response = await fetch(`${API_URL}/deleteOneTask/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};

//API request to retrieve the tasks of an existing user
export const retrieveTasksRequest = async (userId: string): Promise<[Task]> => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token not found in localStorage");
            return;
        }

        const response = await fetch(`${API_URL}/getTasks/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error while retrieving tasks:", errorData.message || response.statusText);
            return null;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Network error:", error);
        return null;
    }
};

//API request to modify a task
export const modifyTaskRequest = async (
    taskId: string,
    isChecked?: boolean,
    description?: string
): Promise<boolean> => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token not found in localStorage");
            return;
        }
        const response = await fetch(`${API_URL}/modifyTask/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ description: description, isChecked: isChecked }),
        });

        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error modifying task:", error);
        return false;
    }
};

//API call to create a new task
export const createTaskRequest = async (description: string, color: string): Promise<Task> => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token not found in localStorage");
            return;
        }

        const response = await fetch(`${API_URL}/createTask`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                description: description,
                color: color,
                isChecked: false,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error while creating task:", errorData.message || response.statusText);
            return null;
        } else {
            const newTask = await response.json();
            return newTask;
        }
    } catch (error) {
        console.error("Network error:", error);
        return null;
    }
};
