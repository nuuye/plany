import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { Button, Card, Input, Stack } from "@chakra-ui/react";
import { RiArrowRightLine } from "react-icons/ri";
import { Boxes } from "../components/background/background-boxes";
import { useRouter } from "next/router";
import preview from "../../public/images/preview.png";
import logo from "../../public/images/planyLogo.png";

import Image from "next/image";

export default function Home() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loaded, setLoaded] = useState(false);

    return (
        <div className={styles.root}>
            <Boxes allowColors={false} />
            <div className={styles.headerContainer}>
                <div className={styles.sidebar}>
                    <Image className={styles.logo} src={logo} alt="Plany Logo" />
                    <div className={styles.buttonContainer}>
                        <Button className={styles.button} colorPalette="teal">
                            Testimonials
                        </Button>
                        <Button className={styles.button} colorPalette="teal">
                            About
                        </Button>
                    </div>
                </div>
            </div>
            <div className={styles.mainContainer}>
                <div className={styles.descriptionContainer}>
                    <h1>Plany – Your Smart Task Manager.</h1>
                    <h3>
                        Create, edit, delete, and organize
                        <br />
                        <span style={{ color: "teal" }}>your work and life effortlessly</span> now
                    </h3>

                    <Button
                        loading={isLoading}
                        colorPalette="teal"
                        variant="solid"
                        onClick={() => {
                            setIsLoading(!isLoading);
                            router.push("/identification");
                        }}
                    >
                        Get Started <RiArrowRightLine />
                    </Button>
                </div>
                <div className={styles.imageContainer}>
                    <Image
                        className={`${styles.image} ${loaded ? styles.imageLoaded : ""}`}
                        src={preview}
                        alt="Isometric illustration"
                        onLoad={() => setLoaded(true)}
                    />
                </div>
            </div>
        </div>
    );
}
