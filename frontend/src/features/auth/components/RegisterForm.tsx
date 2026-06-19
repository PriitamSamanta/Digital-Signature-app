"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    registerSchema,
    RegisterFormData,
} from "../schemas/registerSchema";

import { registerUser }
from "../services/authService";

export default function RegisterForm() {

    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver:
            zodResolver(registerSchema),
    });

    const onSubmit = async (
        data: RegisterFormData
    ) => {
        try {

            await registerUser(
                data.name,
                data.email,
                data.password
            );

            router.push("/login");

        } catch (error) {

            console.error(error);

        }
    };

    return (
        <div
            className="
                relative
                flex
                min-h-screen
                items-center
                justify-center
                bg-cover
                bg-center
            "
            style={{
                backgroundImage:
                    "url('/images/loginregis.jpg')"
            }}
        >
            <div className="absolute inset-0 bg-black/60" />

            <div
                className="
                    relative
                    z-10
                    w-full
                    max-w-md
                    rounded-3xl
                    border
                    border-white/20
                    bg-white/10
                    p-8
                    shadow-2xl
                    backdrop-blur-xl
                "
            >
                <div className="mb-8 text-center">

                    <div
                        className="
                            mx-auto
                            mb-4
                            flex
                            h-16
                            w-16
                            items-center
                            justify-center
                            rounded-2xl
                            bg-white/20
                            text-3xl
                        "
                    >
                        ✍️
                    </div>

                    <h1 className="text-3xl font-bold text-white">
                        Create Account
                    </h1>

                    <p className="mt-2 text-sm text-white/70">
                        Start signing documents securely
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >

                    <input
                        type="text"
                        placeholder="Full Name"
                        {...register("name")}
                        className="
                            h-12
                            w-full
                            rounded-full
                            border
                            border-white/20
                            bg-white/10
                            px-4
                            text-white
                            placeholder:text-white/60
                        "
                    />

                    {errors.name && (
                        <p className="text-sm text-red-300">
                            {errors.name.message}
                        </p>
                    )}

                    <input
                        type="email"
                        placeholder="Email Address"
                        {...register("email")}
                        className="
                            h-12
                            w-full
                            rounded-full
                            border
                            border-white/20
                            bg-white/10
                            px-4
                            text-white
                            placeholder:text-white/60
                        "
                    />

                    {errors.email && (
                        <p className="text-sm text-red-300">
                            {errors.email.message}
                        </p>
                    )}

                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password")}
                        className="
                            h-12
                            w-full
                            rounded-full
                            border
                            border-white/20
                            bg-white/10
                            px-4
                            text-white
                            placeholder:text-white/60
                        "
                    />

                    {errors.password && (
                        <p className="text-sm text-red-300">
                            {errors.password.message}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="
                            h-12
                            w-full
                            rounded-full
                            bg-blue-600
                            text-white
                            hover:bg-blue-700
                        "
                    >
                        Create Account
                    </button>

                </form>

                <p className="mt-6 text-center text-sm text-white/70">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-medium text-white"
                    >
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
}