import { Card, Field, Textarea, Button } from "@chakra-ui/react";
import styles from "./menuContainer.module.scss";
import {
    ColorPickerLabel,
    ColorPickerRoot,
    ColorPickerSwatchGroup,
    ColorPickerSwatchTrigger,
    ColorPickerValueText,
} from "@/components/ui/color-picker";
import { useState } from "react";
import { CgLogOut } from "react-icons/cg";

interface menuContainerProps {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const colors = ["teal", "red", "coral", "gold", "lavender", "pink"];

type Task = {
    _id: string;
    description: string;
    color: string;
};

export default function MenuContainer({ tasks, setTasks }: menuContainerProps) {
    const [color, setColor] = useState<string>("");
    const [taskDescription, setTaskDescription] = useState<string>("");

    const createTask = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/management/createTask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ description: taskDescription, color: color }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error while saving task:", errorData.message || response.statusText);
                return;
            } else {
                const newTask = await response.json(); //retrieving task to assign id
                setTasks((prevTasks) => [
                    ...prevTasks,
                    { _id: newTask._id, description: taskDescription, color: color },
                ]);
                setTaskDescription("");
                console.log("task created and save in database");
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    return (
        <Card.Root className={styles.menuContainer}>
            <Card.Header className={styles.menuHeaderContainer}>Create a new task!</Card.Header>
            <Card.Body className={styles.menuBodyContainer}>
                <Field.Root>
                    <Field.Label>Task description</Field.Label>
                    <Textarea
                        className={styles.textArea}
                        value={taskDescription}
                        onChange={(e) => {
                            setTaskDescription(e.target.value);
                        }}
                        placeholder="description"
                    />
                </Field.Root>

                <ColorPickerRoot className={styles.colorContainer}>
                    <ColorPickerLabel>Select task color:</ColorPickerLabel>
                    <ColorPickerSwatchGroup>
                        {colors.map((item) => (
                            <ColorPickerSwatchTrigger
                                onClick={() => setColor(item)}
                                key={item}
                                value={item}
                                className={styles.colorSquare}
                            />
                        ))}
                    </ColorPickerSwatchGroup>
                </ColorPickerRoot>

                <Button
                    onClick={() => createTask()}
                    colorPalette="teal"
                    variant="surface"
                    className={styles.createButton}
                >
                    Create
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <g
                            fill="none"
                            stroke="#35756b"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            color="#35756b"
                        >
                            <path d="M12 8v8m4-4H8" />
                            <circle cx="12" cy="12" r="10" />
                        </g>
                    </svg>
                </Button>
            </Card.Body>
            <Card.Footer className={styles.footerContainer}>
                <Button variant="ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
                        <path
                            fill="#ffffff"
                            d="M12 1c1.1 0 2 .895 2 2v9c0 1.1-.895 2-2 2H9.5a.5.5 0 0 1 0-1H12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H9.5a.5.5 0 0 1 0-1z"
                        />
                        <path
                            fill="#ffffff"
                            d="M4.15 4.15a.5.5 0 0 1 .707.707l-2.15 2.15h6.79a.5.5 0 0 1 0 1h-6.79l2.15 2.15a.5.5 0 0 1-.707.707l-3-3a.5.5 0 0 1 0-.707l3-3z"
                        />
                    </svg>
                    <span>Log out</span>
                </Button>
            </Card.Footer>
        </Card.Root>
    );
}
