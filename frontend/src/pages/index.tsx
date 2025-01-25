import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { Button, Card, Input, Stack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { RiArrowRightLine } from "react-icons/ri";
import { Boxes } from "../components/background/background-boxes";
import { useForm, SubmitHandler } from "react-hook-form";

const AccountStatus = {
    NEUTRAL: 0,
    LOGIN: 1,
    SIGNUP: 2,
};

export default function Home() {
    const [showSignUpForm, setShowSignUpForm] = useState(false);
    const [email, setEmail] = useState("");
    const [hasAccount, setHasAccount] = useState(AccountStatus.NEUTRAL); // 0 neutral card, 1: hasAccount 2: needAccount

    const createAccount = async (data) => {
        try {
            const response = await fetch("http://localhost:8000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                console.log("success");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const hasAccountCheck = () => {
        setHasAccount(AccountStatus.SIGNUP);

        //Si email entré et password vide, check si email présent en DB
        //Si email entré et password entré, check si match en DB
        //Si pas d'email alors field erreur
        //Si pas de mot de passe field erreur
    };

    type FormValues = {
        name: string;
        email: string;
        password: string;
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data);
        createAccount(data);
    };

    return (
        <div className={styles.mainContainer}>
            <Boxes />
            {hasAccount == 0 && <h1>Plany – Your Smart Task Manager for Work & Life</h1>}
            <Button colorPalette="teal" variant="solid" onClick={() => setShowSignUpForm(true)}>
                Get Started <RiArrowRightLine />
            </Button>
            <Card.Root maxW="m" className={styles.loginContainer}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card.Header>
                        {hasAccount == AccountStatus.NEUTRAL ? (
                            <Card.Title>Create an account or log in to get started</Card.Title>
                        ) : hasAccount == AccountStatus.LOGIN ? (
                            <Card.Title>Log in to get started</Card.Title>
                        ) : (
                            <Card.Title>Create an account to get started</Card.Title>
                        )}
                        <Card.Description>Fill in the form below to continue</Card.Description>
                    </Card.Header>
                    <Card.Body>
                        <Stack gap="4" w="full">
                            {hasAccount == AccountStatus.SIGNUP && (
                                <Field label="Name" invalid={!!errors.name} errorText={errors.name?.message}>
                                    <Input
                                        placeholder="Enter your complete name"
                                        {...register("name", { required: "name is required" })}
                                    />
                                </Field>
                            )}
                            <Field label="Email" invalid={!!errors.email} errorText={errors.email?.message}>
                                <Input
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    {...register("email", { required: "email is required" })}
                                />
                            </Field>
                            {hasAccount == AccountStatus.SIGNUP && (
                                <Stack>
                                    <Field
                                        label="Create a password"
                                        invalid={!!errors.password}
                                        errorText={errors.password?.message}
                                    >
                                        <Input
                                            placeholder="Enter your password"
                                            {...register("password", { required: "you must choose a password" })}
                                        />
                                    </Field>
                                </Stack>
                            )}
                        </Stack>
                    </Card.Body>
                    <Card.Footer justifyContent="flex-end">
                        <Button
                            colorPalette="teal"
                            variant="outline"
                            onClick={() => {
                                setShowSignUpForm(!showSignUpForm), setHasAccount(0);
                            }}
                        >
                            Cancel
                        </Button>
                        {hasAccount == AccountStatus.SIGNUP ? (
                            <Button type="submit" colorPalette="teal" variant="solid">
                                Create
                            </Button>
                        ) : (
                            <Button colorPalette="teal" variant="solid" onClick={() => hasAccountCheck()}>
                                Next
                            </Button>
                        )}
                    </Card.Footer>
                </form>
            </Card.Root>
        </div>
    );
}
