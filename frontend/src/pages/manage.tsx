import { Boxes } from "../components/background/background-boxes";
import { Button, Card, Input, Stack } from "@chakra-ui/react";
import styles from "./manage.module.scss";
import Task from "../components/task/task";
import MenuContainer from "../components/menuContainer/menuContainer";
import { useEffect, useRef, useState } from "react";

interface Task {
    description: string;
    color: string;
    _id: string;
    isChecked: boolean;
}
interface UserType {
    name: string;
    email: string;
}

export default function Manage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [user, setUser] = useState<UserType>();
    const [modifyingTaskId, setModifyingTaskId] = useState<string | null>(null);
    // Ensure localStorage is only accessed in the client-side environment (not during server-side rendering)
    const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

    useEffect(() => {
        console.log("userID: ", userId);
        retrieveUser();
        retrieveTasks();
    }, []);

    useEffect(() => {
        console.log(tasks);
    }, [tasks]);

    const toggleModifyingTask = (taskId: string) => {
        setModifyingTaskId((prevId) => (prevId === taskId ? null : taskId));
    };

    const toggleCheckingTask = (taskId: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task._id === taskId ? { ...task, isChecked: !task.isChecked } : task))
        );
    };

    const retrieveUser = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/auth/getUser/${userId}`, {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();
                console.log("user data: ", data);
                setUser(data);
            } else {
                console.error("Failed to fetch user");
            }
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const retrieveTasks = async () => {
        try {
            const token = localStorage.getItem("token"); // Récupérez le token depuis le localStorage
            if (!token) {
                console.error("Token not found in localStorage");
                return;
            }

            const response = await fetch("http://localhost:8000/api/management/getTasks", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error while retrieving tasks:", errorData.message || response.statusText);
                return;
            }

            const data = await response.json();
            console.log("Retrieved tasks:", data);
            setTasks(data);
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    const deleteTask = async (id: string) => {
        try {
            const token = localStorage.getItem("token"); // Récupérez le token depuis le localStorage
            if (!token) {
                console.error("Token not found in localStorage");
                return;
            }
            const response = await fetch(`http://localhost:8000/api/management/deleteOneTask/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                setTasks((prevTasks) => prevTasks.filter((task) => task._id != id));
                console.log("task deleted");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteAll = async () => {
        try {
            const token = localStorage.getItem("token"); // Récupérez le token depuis le localStorage
            if (!token) {
                console.error("Token not found in localStorage");
                return;
            }
            const response = await fetch(`http://localhost:8000/api/management/deleteAll`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                setTasks([]);
                console.log("task deleted");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.mainContainer}>
            <Boxes allowColors={false} />
            <div className={styles.headerContainer}>
                <span>💠 Welcome back{user ? `, ${user.name}! ` : ""}</span>
            </div>
            <MenuContainer tasks={tasks} setTasks={setTasks} />
            <Card.Root className={styles.contentContainer}>
                <Card.Header className={styles.contentContainerHeader}>
                    <span>My tasks {tasks.length > 0 ? `(${tasks.length})` : ""}</span>
                    <Button
                        onClick={() => deleteAll()}
                        colorPalette="red"
                        className={styles.deleteAllButton}
                        variant="solid"
                    >
                        Delete all tasks
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                            <path
                                fill="#ffffff"
                                d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
                            />
                        </svg>
                    </Button>
                </Card.Header>
                <Card.Body className={styles.contentContainerBody}>
                    <div className={styles.tasksContainer}>
                        {tasks.map((task, index) => (
                            <Task
                                key={task._id}
                                description={task.description}
                                color={task.color}
                                onDelete={() => deleteTask(task._id)}
                                onModifying={() => toggleModifyingTask(task._id)}
                                isModifying={modifyingTaskId === task._id}
                                taskId={task._id}
                                isChecked={task.isChecked}
                                onCheck={() => toggleCheckingTask(task._id)}
                            />
                        ))}
                    </div>
                </Card.Body>
                <Card.Footer />
            </Card.Root>
        </div>
    );
}
