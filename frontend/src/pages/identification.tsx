import React, { useEffect, useState } from "react";
import styles from "./identification.module.scss";
import { Button, Card, Input, Stack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Boxes } from "../components/background/background-boxes";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

enum AccountStatus {
    NEUTRAL = 0, //email check interface
    LOGIN = 1, //login interface
    SIGNUP = 2, //signup interface
}

type SignupFormValues = {
    name: string;
    email: string;
    password: string;
};

type LoginFormValues = {
    email: string;
    password: string;
};

type EmailFormValues = {
    email: string;
};

export default function Identification() {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [hasAccount, setHasAccount] = useState<AccountStatus>(AccountStatus.NEUTRAL);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    //API call to create an account
    const createAccount = async (data: SignupFormValues): Promise<void> => {
        try {
            const response = await fetch("http://localhost:8000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const userData = await response.json();
            console.log("create account userData : ", userData);

            if (response.ok) {
                localStorage.setItem("userId", userData.userId);
                const token = userData.token;
                localStorage.setItem("token", token);
                router.push("/manage");
                console.log("success");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    //API call to check if an email is in the DB
    const hasAccountCheck = async (email: string): Promise<void> => {
        try {
            const response = await fetch("http://localhost:8000/api/auth/checkingEmail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok && response.status === 200) {
                setHasAccount(AccountStatus.LOGIN);
            } else {
                setHasAccount(AccountStatus.SIGNUP);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const isLoginSuccessful = async (credentials: LoginFormValues): Promise<boolean> => {
        try {
            const response = await fetch("http://localhost:8000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });
            const data = await response.json();

            if (response.ok) {
                console.log(data);
                localStorage.setItem("userId", data.userId);
                const token = data.token;
                localStorage.setItem("token", token);
                router.push("/manage");
                console.log("response is ok");
                return true;
            } else {
                console.log("response is NOT ok");
                return false;
            }
        } catch {
            return false;
        }
    };

    //signup form handler
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<SignupFormValues>();

    //email test form handler
    const {
        register: registerEmail,
        handleSubmit: handleSubmitEmail,
        formState: { errors: errorsEmail },
        reset: resetEmail,
    } = useForm<EmailFormValues>();

    //login form handler
    const {
        register: registerLogin,
        handleSubmit: handleSubmitLogin,
        formState: { errors: errorsLogin },
        reset: resetLogin,
    } = useForm<LoginFormValues>();

    const onSubmitSignup: SubmitHandler<SignupFormValues> = (data) => {
        setIsLoading(!isLoading);
        console.log("signup data: ", data);
        createAccount(data);
    };

    const onSubmitLogin: SubmitHandler<LoginFormValues> = (data) => {
        console.log(data);
        if (isLoginSuccessful(data)) {
            setIsLoading(!isLoading);
            console.log("success");
        } else {
            console.log("error");
        }
    };

    const onSubmitEmail: SubmitHandler<EmailFormValues> = (data) => {
        setEmail(data.email);
        console.log(data);
        hasAccountCheck(data.email);
    };

    // When switching forms, reset the form values
    useEffect(() => {
        reset(); //defaultValue on input for email
        resetEmail({ email });
        resetLogin({ email });
    }, [hasAccount, reset, resetEmail, resetLogin, email]);

    return (
        <div className={styles.mainContainer}>
            <Boxes />

            {/* Check if user has an Account or not */}
            {hasAccount === AccountStatus.NEUTRAL ? (
                <Card.Root
                    data-state="open"
                    _open={{
                        animation: "fade-in 300ms ease-out",
                    }}
                    size="md"
                    maxW="m"
                    className={styles.checkContainer}
                >
                    <form onSubmit={handleSubmitEmail(onSubmitEmail)}>
                        <Card.Header>
                            <Card.Title>Create an account or log in to get started</Card.Title>
                            <Card.Description>Fill in the form below to continue</Card.Description>
                        </Card.Header>
                        <Card.Body>
                            <Stack gap="4" w="full">
                                <Field
                                    label="Email"
                                    invalid={!!errorsEmail.email}
                                    errorText={errorsEmail.email?.message}
                                >
                                    <Input
                                        defaultValue={email}
                                        placeholder="Enter your email"
                                        {...registerEmail("email", { required: "email is required" })}
                                    />
                                </Field>
                            </Stack>
                        </Card.Body>
                        <Card.Footer className={styles.checkFooterContainer}>
                            <Button
                                loading={isLoading}
                                colorPalette="teal"
                                variant="outline"
                                onClick={() => {
                                    router.push("/");
                                    setIsLoading(!isLoading);
                                }}
                            >
                                Go back
                            </Button>
                            <Button type="submit" colorPalette="teal" variant="solid">
                                Next <MdOutlineKeyboardArrowRight />
                            </Button>
                        </Card.Footer>
                    </form>
                </Card.Root>
            ) : hasAccount === AccountStatus.LOGIN ? (
                // Login form
                <Card.Root size="lg" maxW="md" className={styles.loginContainer}>
                    <form onSubmit={handleSubmitLogin(onSubmitLogin)}>
                        <Card.Header>
                            <Card.Title>Log in to get started</Card.Title>
                            <Card.Description>Fill in the form below to continue</Card.Description>
                        </Card.Header>
                        <Card.Body>
                            <Stack gap="4" w="full">
                                <Field
                                    label="Email"
                                    invalid={!!errorsLogin.email}
                                    errorText={errorsLogin.email?.message}
                                >
                                    <Input
                                        placeholder="Enter your email"
                                        {...registerLogin("email", { required: "email is required" })}
                                    />
                                </Field>
                                <Field
                                    label="Password"
                                    invalid={!!errorsLogin.password}
                                    errorText={errorsLogin.password?.message}
                                >
                                    <Input
                                        type="password"
                                        placeholder="Enter your password"
                                        {...registerLogin("password", { required: "you must enter a password" })}
                                    />
                                </Field>
                            </Stack>
                        </Card.Body>
                        <Card.Footer justifyContent="flex-end">
                            <Button
                                colorPalette="teal"
                                variant="outline"
                                onClick={() => setHasAccount(AccountStatus.NEUTRAL)}
                            >
                                Cancel
                            </Button>
                            <Button loading={isLoading} type="submit" colorPalette="teal" variant="solid">
                                Log in
                            </Button>
                        </Card.Footer>
                    </form>
                </Card.Root>
            ) : hasAccount === AccountStatus.SIGNUP ? (
                // Signup form
                <Card.Root maxW="m" className={styles.signupContainer}>
                    <form onSubmit={handleSubmit(onSubmitSignup)}>
                        <Card.Header>
                            <Card.Title>Create an account to get started</Card.Title>
                            <Card.Description>Fill in the form below to continue</Card.Description>
                        </Card.Header>
                        <Card.Body>
                            <Stack gap="4" w="full">
                                <Field label="Name" invalid={!!errors.name} errorText={errors.name?.message}>
                                    <Input
                                        placeholder="Enter your complete name"
                                        {...register("name", { required: "name is required" })}
                                    />
                                </Field>
                                <Field label="Email" invalid={!!errors.email} errorText={errors.email?.message}>
                                    <Input
                                        defaultValue={email}
                                        placeholder="Enter your email"
                                        {...register("email", { required: "email is required" })}
                                    />
                                </Field>
                                <Field
                                    label="Create a password"
                                    invalid={!!errors.password}
                                    errorText={errors.password?.message}
                                >
                                    <Input
                                        type="password"
                                        placeholder="Enter your password"
                                        {...register("password", { required: "you must choose a password" })}
                                    />
                                </Field>
                            </Stack>
                        </Card.Body>
                        <Card.Footer justifyContent="flex-end">
                            <Button
                                colorPalette="teal"
                                variant="outline"
                                onClick={() => setHasAccount(AccountStatus.NEUTRAL)}
                            >
                                Cancel
                            </Button>
                            <Button loading={isLoading} type="submit" colorPalette="teal" variant="solid">
                                Create
                            </Button>
                        </Card.Footer>
                    </form>
                </Card.Root>
            ) : (
                <></>
            )}
        </div>
    );
}
