import React from "react";
import { useForm, Controller } from "react-hook-form";
import "./App.css";

function App() {
    const {
        control,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm({
        defaultValues: {
            email: "",
            password1: "",
            password2: "",
        },
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email. Please try again.",
                        },
                    }}
                    render={({ field }) => (
                        <input {...field} type="email" placeholder="Email" />
                    )}
                />
                {errors.email && (
                    <div className="errorText">{errors.email.message}</div>
                )}

                <Controller
                    name="password1"
                    control={control}
                    rules={{
                        required: "Password is required",
                        validate: (value) =>
                            (value.length >= 8 &&
                                /[a-z]/.test(value) &&
                                /[A-Z]/.test(value) &&
                                /\d/.test(value)) ||
                            "Password must be at least 8 characters long and contain at least 1 lowercase, 1 uppercase letter, and 1 digit.",
                    }}
                    render={({ field }) => (
                        <input
                            {...field}
                            type="password"
                            placeholder="Password"
                        />
                    )}
                />
                {errors.password1 && (
                    <div className="errorText">{errors.password1.message}</div>
                )}

                <Controller
                    name="password2"
                    control={control}
                    rules={{
                        required: "Password confirmation is required",
                        validate: (value) =>
                            value === getValues("password1") ||
                            "Passwords do not match.",
                    }}
                    render={({ field }) => (
                        <input
                            {...field}
                            type="password"
                            placeholder="Rewrite password"
                        />
                    )}
                />
                {errors.password2 && (
                    <div className="errorText">{errors.password2.message}</div>
                )}

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default App;
