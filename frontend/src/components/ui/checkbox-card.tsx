import { CheckboxCard as ChakraCheckboxCard } from "@chakra-ui/react";
import * as React from "react";
import styles from "./checkbox-card.module.scss";
import { useState, useRef, useEffect } from "react";
import { Input } from "@chakra-ui/react";

export interface CheckboxCardProps extends ChakraCheckboxCard.RootProps {
    label: React.ReactNode;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    customBackgroundColor?: string;
    onDelete?: () => void;
    isModifying?: boolean;
    onModifying?: () => void;
}

export const CheckboxCard = React.forwardRef<HTMLInputElement, CheckboxCardProps>(function CheckboxCard(props, ref) {
    const {
        inputProps,
        label,
        customBackgroundColor = "#0080809c",
        onDelete,
        isModifying = false,
        onModifying,
        ...rest
    } = props;
    const [isDeleteHover, setIsDeleteHover] = useState<boolean>(false);
    const [isModifyHover, setIsModifyHover] = useState<boolean>(false);
    
    const inputRef = useRef<HTMLInputElement>(null);

    const handleModifyClick = () => {
        if (onModifying) {
            onModifying();
        }
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 0);
    };

    return (
        <ChakraCheckboxCard.Root {...rest}>
            <ChakraCheckboxCard.HiddenInput ref={ref} {...inputProps} />
            <ChakraCheckboxCard.Control backgroundColor={customBackgroundColor} className={styles.taskContainer}>
                <div className={styles.contentContainer}>
                    <div className={styles.checkLabelContainer}>
                        <ChakraCheckboxCard.Indicator />
                        {isModifying ? (
                            <Input ref={inputRef} size="xs" className={styles.inputContainer} />
                        ) : (
                            <ChakraCheckboxCard.Label>{label}</ChakraCheckboxCard.Label>
                        )}
                    </div>
                    <div className={styles.iconContainer}>
                        <svg
                            onMouseEnter={() => setIsModifyHover(true)}
                            onMouseLeave={() => setIsModifyHover(false)}
                            onClick={handleModifyClick}
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill={isModifyHover ? "#04A4B9" : "#ffffff"}
                                d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h8.925l-2 2H5v14h14v-6.95l2-2V19q0 .825-.587 1.413T19 21zm4-6v-4.25l9.175-9.175q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4t-.137.738t-.438.662L13.25 15zM21.025 4.4l-1.4-1.4zM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575zm6.5-6.5l-.725-.7zl.7.7z"
                            />
                        </svg>
                        <svg
                            onMouseEnter={() => setIsDeleteHover(true)}
                            onMouseLeave={() => setIsDeleteHover(false)}
                            onClick={onDelete}
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill={isDeleteHover ? "red" : "#ffffff"}
                                d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
                            />
                        </svg>
                    </div>
                </div>
            </ChakraCheckboxCard.Control>
        </ChakraCheckboxCard.Root>
    );
});

export const CheckboxCardIndicator = ChakraCheckboxCard.Indicator;
