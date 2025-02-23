import { CheckboxCard } from "@/components/ui/checkbox-card";
import styles from "./task.module.scss";
import { useState } from "react";
import { modifyTaskRequest } from "../../services/task";

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
        await modifyTaskRequest(taskId, undefined, newLabel);
    };

    const handleCheckChange = async (checked: boolean) => {
        const success = await modifyTaskRequest(taskId, checked, undefined);
        if (success) {
            setIsChecked(checked);
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
