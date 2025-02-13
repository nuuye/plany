import { Boxes } from "../components/background/background-boxes";
import { Button, Card } from "@chakra-ui/react";
import styles from "./about.module.scss";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useState } from "react";
import router from "next/router";

export default function About() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [allowColors, setAllowColors] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined" && typeof screen.orientation !== "undefined") {
            setAllowColors(false);
        }
    }, []);

    return (
        <div className={styles.mainContainer}>
            <Boxes allowColors={allowColors} />
            <Card.Root className={styles.cardRoot} size="lg">
                <Card.Header className={styles.cardHeader}>About Plany</Card.Header>
                <Card.Body className={styles.cardBody}>
                    <p>
                        <strong>Plany</strong> is a to-do list application designed to help users stay organized
                        effortlessly. This project was created to enhance my skills in both back-end and front-end
                        development while building a fully functional and secure web application.
                    </p>

                    <span>Technologies Used:</span>
                    <ul>
                        <li>
                            <strong>Front-end:</strong> React with TypeScript, Next.js (routing & server-side rendering)
                        </li>
                        <li>
                            <strong>Back-end:</strong> Node.js with Express.js
                        </li>
                        <li>
                            <strong>Database:</strong> MongoDB for data storage
                        </li>
                        <li>
                            <strong>Style library:</strong> Chakra UI
                        </li>
                    </ul>

                    <p>
                        For authentication, Plany uses <strong>JWT (JSON Web Tokens)</strong> to securely manage user
                        sessions. Passwords are hashed with <strong>bcrypt</strong> to ensure data security.
                    </p>

                    <span>Github repository:</span>
                    <p>
                        <a href="https://github.com/nuuye/plany" target="_blank" rel="noopener noreferrer">
                            github.com/nuuye/plany
                        </a>
                    </p>
                </Card.Body>
                <Card.Footer className={styles.cardFooter}>
                    <Button
                        loading={isLoading}
                        colorPalette="teal"
                        className={styles.button}
                        onClick={() => {
                            setIsLoading(!isLoading);
                            router.push("/");
                        }}
                    >
                        <IoIosArrowBack />
                        Go back
                    </Button>
                </Card.Footer>
            </Card.Root>
            <Button
                loading={isLoading}
                colorPalette="teal"
                className={styles.buttonMobile}
                onClick={() => {
                    setIsLoading(!isLoading);
                    router.push("/");
                }}
            >
                <IoIosArrowBack />
                Go back
            </Button>
        </div>
    );
}
