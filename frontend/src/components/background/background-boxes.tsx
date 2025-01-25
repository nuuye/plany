"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "./background-boxes.module.scss";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
    const rows = new Array(150).fill(1);
    const cols = new Array(100).fill(1);

    const colors = [
        "rgba(125, 211, 252, 0.5)", // sky-300
        "rgba(249, 168, 212, 0.5)", // pink-300
        "rgba(134, 239, 172, 0.5)", // green-300
        "rgba(253, 224, 71, 0.5)", // yellow-300
        "rgba(252, 165, 165, 0.5)", // red-300
        "rgba(216, 180, 254, 0.5)", // purple-300
        "rgba(147, 197, 253, 0.5)", // blue-300
        "rgba(165, 180, 252, 0.5)", // indigo-300
        "rgba(196, 181, 253, 0.5)", // violet-300
    ];

    const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

    return (
        <div className={`${styles.boxesContainer} ${className}`} {...rest}>
            {rows.map((_, i) => (
                <motion.div key={`row${i}`} className={styles.row}>
                    {cols.map((_, j) => (
                        <motion.div
                            whileHover={{ backgroundColor: getRandomColor(), transition: { duration: 0 } }}
                            animate={{ transition: { duration: 2 } }}
                            key={`col${j}`}
                            className={styles.cell}
                        >
                            {j % 2 === 0 && i % 2 === 0 ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className={styles.icon}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                                </svg>
                            ) : null}
                        </motion.div>
                    ))}
                </motion.div>
            ))}
        </div>
    );
};

export const Boxes = React.memo(BoxesCore);
