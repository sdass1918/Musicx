import React, { useState } from "react";
import authenticationService from "../lib/appwrite";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleLogin = async (data) => {
        setError("");
        try {
            const userData = await authenticationService.login(data);
            if (userData) {
                const currentUser = await authenticationService.getCurrentUser();
                if (currentUser) dispatch(login(currentUser));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-500">
            <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
                <h2 className="text-center text-2xl font-bold">Login to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don't have an account?{" "}
                    <Link to="/signup" className="font-medium text-primary transition-all duration-200 hover:underline">
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit(handleLogin)} className="space-y-5 mt-5">
                    {/* Email Input */}
                    <div>
                        <label className="block mb-1 font-semibold">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    message: "Email address must be valid"
                                }
                            })}
                            className="w-full p-2 border rounded-md"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block mb-1 font-semibold">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", { required: "Password is required" })}
                            className="w-full p-2 border rounded-md"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
