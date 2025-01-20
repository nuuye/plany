import React from "react";
import { Button } from "@/components/ui/button";
import styles from './index.module.scss';

import { RiArrowRightLine } from "react-icons/ri";
export default function Home() {
    return (
        <div className={styles.mainContainer}>
            <h1>Plany – Your Smart Task Manager for Work & Life</h1>
            <Button colorPalette="teal" variant="solid">
                Get Started <RiArrowRightLine />
            </Button>
        </div>
    );
}
