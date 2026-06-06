"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    loginSchema,
    LoginFormData,
} from "../schemas/loginSchema";

import { loginUser } from "../services/authService";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();

    const { setAuth } = useAuthStore();


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (
        data: LoginFormData
    ) => {
        try {
            const response = await loginUser(
                data.email,
                data.password
            );

            setAuth(
                response.user,
                response.token
            );

            router.push("/dashboard");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
        >
            <input
                type="email"
                placeholder="Email"
                {...register("email")}
            />

            {errors.email && (
                <p>{errors.email.message}</p>
            )}

            <input
                type="password"
                placeholder="Password"
                {...register("password")}
            />

            {errors.password && (
                <p>{errors.password.message}</p>
            )}

            <button type="submit">
                Login
            </button>
        </form>
    );
}