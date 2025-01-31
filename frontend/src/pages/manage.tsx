import { Boxes } from "../components/background/background-boxes";
import { Button, Card, Input, Stack } from "@chakra-ui/react";
import styles from "./manage.module.scss";
import Task from "../components/task/task";
import MenuContainer from "../components/menuContainer/menuContainer";
import { useState } from "react";

type Task = {
    description: string;
    color: string;
};

export default function Manage() {
    const [tasks, setTasks] = useState<Task[]>([]);

    return (
        <div className={styles.mainContainer}>
            <Boxes allowColors={false} />
            <MenuContainer tasks={tasks} setTasks={setTasks} />
            <Card.Root className={styles.contentContainer}>
                <Card.Header className={styles.contentContainerHeader}>My tasks</Card.Header>
                <Card.Body className={styles.contentContainerBody}>
                    <div className={styles.tasksContainer}>
                        {tasks.map((task, index) => (
                            <Task key={index} description={task.description} color={task.color} />
                        ))}
                    </div>
                </Card.Body>
                <Card.Footer />
            </Card.Root>
        </div>
    );
}
