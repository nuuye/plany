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
    onCheck?: () => void;
    isChecked?: boolean;
    onCheckChange?: (checkboxState: boolean) => void;
}

export default function Task({
    description,
    color,
    onDelete,
    onModifying,
    isModifying,
    onLabelChange,
    taskId,
    isChecked: initialIsChecked,
    onCheck,
    onCheckChange,
}: TaskProps) {
    const [label, setLabel] = useState(description);
    const [isChecked, setIsChecked] = useState(initialIsChecked);

    const colorPaletteConverter = (color): { color; background } => {
        switch (color) {
            case "red":
                return { color: "red", background: "#c200009c" };
            case "coral":
                return { color: "orange", background: "#ff7f509c" };
            case "gold":
                return { color: "yellow", background: "#ffce00c9" };
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
            const token = localStorage.getItem("token"); // Récupérez le token depuis le localStorage
            if (!token) {
                console.error("Token not found in localStorage");
                return;
            }
            const response = await fetch(`https://plany-backend.vercel.app/api/management/modifyTask/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
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

    const handleCheckChange = async (checked: boolean) => {
        if (onCheckChange) {
            onCheckChange(checked);
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("Token not found in localStorage");
                return;
            }

            const response = await fetch(`https://plany-backend.vercel.app/api/management/modifyTask/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ isChecked: checked }),
            });

            if (response.ok) {
                console.log("Task check status updated successfully");
                setIsChecked(checked);
            } else {
                console.error("Failed to update task check status");
            }
        } catch (error) {
            console.error("Error updating task check status:", error);
        }
    };

    return (
        <CheckboxCard
            className={styles.taskContainer}
            label={label}
            colorPalette={colorPaletteConverter(color).color}
            variant="surface"
            color={color}
            customBackgroundColor={colorPaletteConverter(color).background}
            onDelete={onDelete}
            onModifying={onModifying}
            isModifying={isModifying}
            onLabelChange={handleLabelChange}
            isChecked={isChecked}
            onCheck={(newValue) => {
                handleCheckChange(newValue);
            }}
        />
    );
}
