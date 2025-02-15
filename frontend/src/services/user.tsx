const API_URL = "https://plany-backend.vercel.app/api/auth";

interface UserType {
    name: string;
    email: string;
}

interface SignupFormValues {
    name: string;
    email: string;
    password: string;
}

interface LoginFormValues {
    email: string;
    password: string;
}

//API request to retrieve the logged user
export const retrieveUserRequest = async (userId: string): Promise<UserType> => {
    try {
        const response = await fetch(`${API_URL}/getUser/${userId}`, {
            method: "GET",
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error("Failed to fetch user");
            return null;
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
};

export const createAccountRequest = async (data: SignupFormValues) => {
    try {
        const response = await fetch(`${API_URL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const userData = await response.json();

        if (response.ok) {
            return userData;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

export const hasAccountCheckRequest = async (email: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/checkingEmail`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        if (response.ok && response.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log("Error:", error);
        return false;
    }
};

export const isLoginSuccessfulRequest = async (credentials: LoginFormValues) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            return null;
        }
    } catch (error) {
        console.log("Error:", error);
        return null;
    }
};
