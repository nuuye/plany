import { CheckboxCard } from "@/components/ui/checkbox-card";
import styles from "./task.module.scss";
import { useState } from "react";

interface TaskProps {
    description?: string;
    color?: string;
    onDelete?: () => void;
    onModifying?: () => void;
    isModifying?: boolean;
    onLabelChange?: (newLabel: string) => void;
    taskId: string;
}

export default function Task({
    description,
    color,
    onDelete,
    onModifying,
    isModifying,
    onLabelChange,
    taskId,
}: TaskProps) {
    const [label, setLabel] = useState(description);

    const colorPaletteConverter = (color): { color; background } => {
        switch (color) {
            case "red":
                return { color: "red", background: "#c200009c" };
            case "coral":
                return { color: "orange", background: "#ff7f509c" };
            case "gold":
                return { color: "yellow", background: "#ffd7009c" };
            case "lavender":
                return { color: "purple", background: "#e6e6fa9c" };
            case "pink":
                return { color: "pink", background: "#ffc0cb9c" };
            default:
                return { color: "teal", background: "#0080809c" };
        }
    };

    const handleLabelChange = async (newLabel: string) => {
        setLabel(newLabel);
        if (onLabelChange) {
            onLabelChange(newLabel);
        }

        try {
            const response = await fetch(`http://localhost:8000/api/management/modifyTask/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ description: newLabel }),
            });

            if (response.ok) {
                console.log("Task modified successfully");
            } else {
                console.error("Failed to modify task");
            }
        } catch (error) {
            console.error("Error modifying task:", error);
        }
    };

    return (
        <CheckboxCard
            className={styles.taskContainer}
            label={label}
            colorPalette={colorPaletteConverter(color).color}
            variant="surface"
            customBackgroundColor={colorPaletteConverter(color).background}
            onDelete={onDelete}
            onModifying={onModifying}
            isModifying={isModifying}
            onLabelChange={handleLabelChange}
        />
    );
}
