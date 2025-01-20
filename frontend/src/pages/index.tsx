import React, { useState } from "react";
import styles from "./index.module.scss";
import { Button, Card, Input, Stack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { RiArrowRightLine } from "react-icons/ri";

export default function Home() {
    const [showSignUpForm, setShowSignUpForm] = useState(false);

    return (
        <div className={styles.mainContainer}>
            <h1>Plany – Your Smart Task Manager for Work & Life</h1>
            <Button colorPalette="teal" variant="solid" onClick={() => setShowSignUpForm(true)}>
                Get Started <RiArrowRightLine />
            </Button>
            {showSignUpForm && (
                <Card.Root maxW="m">
                    <Card.Header>
                        <Card.Title>Create an account or log in to get started</Card.Title>
                        <Card.Description>Fill in the form below to create an account</Card.Description>
                    </Card.Header>
                    <Card.Body>
                        <Stack gap="4" w="full">
                            <Field label="Email" errorText="This field is required">
                                <Input
                                    placeholder="Enter your email"
                                />
                            </Field>
                        </Stack>
                    </Card.Body>
                    <Card.Footer justifyContent="flex-end">
                        <Button colorPalette="teal" variant="outline">
                            Cancel
                        </Button>
                        <Button colorPalette="teal" variant="solid">
                            Next
                        </Button>
                    </Card.Footer>
                </Card.Root>
            )}
        </div>
    );
}
