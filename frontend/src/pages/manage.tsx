import { Button, Card } from "@chakra-ui/react";
import styles from "./manage.module.scss";
import Task from "../components/task/task";
import MenuContainer from "../components/menuContainer/menuContainer";
import { useEffect, useState } from "react";
import planyLogo from "../../public/images/planyIcon.png";
import Image from "next/image";
import { deleteAllRequest, deleteTaskRequest, retrieveTasksRequest } from "../services/task";
import { retrieveUserRequest } from "../services/user";
import { UserType, TaskType } from "../types/index";

export default function Manage() {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [user, setUser] = useState<UserType>();
    const [modifyingTaskId, setModifyingTaskId] = useState<string | null>(null);

    // Ensure localStorage is only accessed in the client-side environment (not during server-side rendering)
    const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

    //retrieve user and its tasks at loading
    useEffect(() => {
        retrieveUser();
        retrieveTasks();
    }, []);

    //toggle to update task status (label or input) frontend wise
    const toggleModifyingTask = (taskId: string) => {
        setModifyingTaskId((prevId) => (prevId === taskId ? null : taskId));
    };

    //toggle to update isCheck attribute frontend wise
    const toggleCheckingTask = (taskId: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task._id === taskId ? { ...task, isChecked: !task.isChecked } : task))
        );
    };

    // async function to retrieve the logged user (name, email)
    const retrieveUser = async () => {
        const data = await retrieveUserRequest(userId);
        if (data) {
            setUser(data);
        }
    };

    //async function to retrieve all tasks related to the logged user
    const retrieveTasks = async () => {
        const data = await retrieveTasksRequest(userId);
        if (data) {
            setTasks(data);
        }
    };

    // async function to delete a specific task
    const deleteTask = async (id: string) => {
        const success = await deleteTaskRequest(id);
        if (success) {
            setTasks((prevTasks) => prevTasks.filter((task) => task._id != id));
        }
    };

    //async function to delete all tasks
    const deleteAll = async () => {
        const success = await deleteAllRequest();
        if (success) {
            setTasks([]);
        }
    };

    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.headerContainer}>
                    <Image src={planyLogo} alt="plany logo" className={styles.logo} />
                    <span>Welcome back{user ? `, ${user.name}! ` : ""}</span>
                </div>
                <div className={styles.menuContainer}>
                    <MenuContainer tasks={tasks} setTasks={setTasks} />
                </div>
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
                            {tasks.map((task) => (
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
                    <Card.Footer className={styles.contentContainerFooter}>
                        <Button
                            onClick={() => deleteAll()}
                            colorPalette="red"
                            className={styles.deleteAllButtonMobile}
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
                    </Card.Footer>
                </Card.Root>
            </div>
        </>
    );
}
