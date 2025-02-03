import { Boxes } from "../components/background/background-boxes";
import { Button, Card, Input, Stack } from "@chakra-ui/react";
import styles from "./manage.module.scss";
import Task from "../components/task/task";
import MenuContainer from "../components/menuContainer/menuContainer";
import { useEffect, useState } from "react";

type Task = {
    description: string;
    color: string;
    _id: string;
};

export default function Manage() {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        retrieveTasks();
    }, []);

    useEffect(() => {
        console.log(tasks);
    }, [tasks]);

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
