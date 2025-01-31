import { CheckboxCard } from "@/components/ui/checkbox-card";
import styles from "./task.module.scss";

interface taskProps {
    description?: string;
    color?: string;
}

export default function Task({ description, color }: taskProps) {
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

    return (
        <CheckboxCard
            className={styles.taskContainer}
            label={description}
            colorPalette={colorPaletteConverter(color).color}
            variant="surface"
            customBackgroundColor={colorPaletteConverter(color).background}
        />
    );
}
