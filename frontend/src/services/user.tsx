const API_URL = "https://plany-backend.vercel.app/api/auth";

interface UserType {
    name: string;
    email: string;
}

//API request to retrieve the logged user
export const retrieveUserRequest = async (userId: string) : Promise<UserType> => {
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
