import { Boxes } from "../components/background/background-boxes";
import { Button, Card, Input, Stack } from "@chakra-ui/react";
import styles from "./manage.module.scss";
import Task from "../components/task/task";
import MenuContainer from "../components/menuContainer/menuContainer";
import { useEffect, useState } from "react";

interface Task {
    description: string;
    color: string;
    _id: string;
}
interface UserType {
    name: string;
    email: string;
}

export default function Manage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [user, setUser] = useState<UserType>();

    // Ensure localStorage is only accessed in the client-side environment (not during server-side rendering)
    const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

    useEffect(() => {
        retrieveTasks();
        retrieveUser();
        console.log("userID: ", userId);
    }, []);

    useEffect(() => {
        console.log(tasks);
    }, [tasks]);

    const retrieveUser = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/auth/getUser/${userId}`, {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();
                console.log("userData: ", data);
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
            const response = await fetch("http://localhost:8000/api/management/getTasks");
            if (!response.ok) {
                console.error("Error while retrieving tasks");
                return;
            }
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteTask = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:8000/api/management/deleteOneTask/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setTasks((prevTasks) => prevTasks.filter((task) => task._id != id));
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
                <span>💠 Welcome back {user ? `, ${user.name}! ` : ''}</span>
            </div>
            <MenuContainer tasks={tasks} setTasks={setTasks} />
            <Card.Root className={styles.contentContainer}>
                <Card.Header className={styles.contentContainerHeader}>My tasks</Card.Header>
                <Card.Body className={styles.contentContainerBody}>
                    <div className={styles.tasksContainer}>
                        {tasks.map((task, index) => (
                            <Task
                                key={index}
                                description={task.description}
                                color={task.color}
                                onDelete={() => deleteTask(task._id)}
                            />
                        ))}
                    </div>
                </Card.Body>
                <Card.Footer />
            </Card.Root>
        </div>
    );
}
