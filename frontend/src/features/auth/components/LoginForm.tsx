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
                    "url('/images/loginregis.jpg')",
            }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Login Card */}
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
                {/* Logo */}
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
                        Digital Signature
                    </h1>

                    <p className="mt-2 text-sm text-white/70">
                        Secure Document Signing Platform
                    </p>

                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    <div>

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
                            focus:border-white/40
                            focus:outline-none
                        "
                        />

                        {errors.email && (
                            <p className="mt-1 text-sm text-red-300">
                                {errors.email.message}
                            </p>
                        )}

                    </div>

                    <div>

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
                            focus:border-white/40
                            focus:outline-none
                        "
                        />

                        {errors.password && (
                            <p className="mt-1 text-sm text-red-300">
                                {errors.password.message}
                            </p>
                        )}

                    </div>

                    <button
                        type="submit"
                        className="
                        h-12
                        w-full
                        rounded-full
                        bg-blue-600
                        text-white
                        transition-all
                        duration-300
                        hover:bg-blue-700
                    "
                    >
                        Login
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-white/70">
                    Don't have an account?{" "}
                    <a
                        href="/register"
                        className="font-medium text-white"
                    >
                        Register
                    </a>
                </p>

                {/* Footer */}
                <div className="mt-8 border-t border-white/10 pt-6 text-center">
                    <p className="text-xs text-white/60">
                        PDF Upload • Public Signing • Audit Trail
                    </p>
                </div>

            </div>
        </div>
    );
}