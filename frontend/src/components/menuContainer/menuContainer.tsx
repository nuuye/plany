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

interface menuContainerProps {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const colors = ["teal", "red", "coral", "gold", "lavender", "pink"];

type Task = {
    description: string;
    color: string;
};

export default function MenuContainer({tasks, setTasks}: menuContainerProps) {
    const [color, setColor] = useState<string>("");
    const [taskDescription, setTaskDescription] = useState<string>("");

    const createTask = () => {
        setTasks((prevTasks) => [...prevTasks, { description: taskDescription, color: color }]);
    };

    return (
        <Card.Root className={styles.menuContainer}>
            <Card.Header className={styles.menuHeaderContainer} >Create a new task!</Card.Header>
            <Card.Body className={styles.menuBodyContainer}>
                <Field.Root>
                    <Field.Label>Task description</Field.Label>
                    <Textarea onChange={(e) => setTaskDescription(e.target.value)} placeholder="description" />
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
            <Card.Footer></Card.Footer>
        </Card.Root>
    );
}
