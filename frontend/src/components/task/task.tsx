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
    taskId,
    isChecked: initialIsChecked, //rename
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

    // update label value & API call to modify task label
    const handleLabelChange = async (newLabel: string) => {
        const success = await modifyTaskRequest(taskId, undefined, newLabel);
        if (success) {
            setLabel(newLabel);
        }
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
            onLabelChange={(newLabel) => handleLabelChange(newLabel)}
            isChecked={isChecked}
            onCheck={(newValue) => {
                handleCheckChange(newValue);
            }}
        />
    );
}
