"use client";
import { authClient } from "@/lib/auth-client";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function SignUpPage() {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    console.log(user);
    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.image,
    });

    console.log({ data, error });

    if (data) {
      redirect("/");
    }

    if (error) {
      alert("Error");
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };
  return (
    <div className="min-h-screen bg-[#f8fafc] px-4 py-8">
      {/* Header */}
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-[28px] font-medium tracking-tight text-gray-900">
          Create Account
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Start your adventure with Wanderlust
        </p>

        {/* Pink underline */}
        <div className="mx-auto mt-2 h-0.5 w-4 bg-pink-500" />
      </div>

      {/* Card */}
      <div className="mx-auto mt-2 w-full max-w-md border border-gray-200 bg-white px-6 py-6 shadow-sm">
        <Form onSubmit={onSubmit} className="flex w-full flex-col gap-4">
          {/* Full Name */}
          <TextField isRequired name="name" className="w-full">
            <Label className="mb-1.5 text-xs font-medium text-gray-900">
              Full Name
            </Label>

            <Input
              placeholder="Enter your name"
              className="h-9 w-full rounded-none border border-gray-200 bg-[#f8fafc] px-3 text-xs"
            />

            <FieldError />
          </TextField>

          {/*Image Url */}
          <TextField name="image" type="url" className="w-full">
            <Label className="mb-1.5 text-xs font-medium text-gray-900">
              Image URL
            </Label>

            <Input
              placeholder="Image URL"
              className="h-9 w-full rounded-none border border-gray-200 bg-[#f8fafc] px-3 text-xs"
            />

            <FieldError />
          </TextField>

          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            placeholder="Enter your name"
            className="w-full"
            validate={(value) => {
              if (!value) {
                return "Email is required";
              }

              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }

              return null;
            }}
          >
            <Label className="mb-1.5 text-xs font-medium text-gray-900">
              Email Address
            </Label>

            <Input
              placeholder="Enter your email"
              className="h-9 w-full rounded-none border border-gray-200 bg-[#f8fafc] px-3 text-xs"
            />

            <FieldError />
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            name="password"
            type="password"
            minLength={8}
            className="w-full"
            validate={(value) => {
              if (!value) {
                return "Password is required";
              }

              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }

              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }

              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }

              return null;
            }}
          >
            <Label className="mb-1.5 text-xs font-medium text-gray-900">
              Password
            </Label>

            <Input
              placeholder="Create a password"
              className="h-9 w-full rounded-none border border-gray-200 bg-[#f8fafc] px-3 text-xs"
            />

            <Description className="text-[10px] text-gray-400">
              Minimum 8 characters, 1 uppercase letter and 1 number
            </Description>

            <FieldError />
          </TextField>

          {/* Create Account */}
          <Button
            type="submit"
            className="mt-1 h-9 w-full rounded-none bg-[#18a7c2] text-xs font-medium text-white hover:bg-[#1295ae]"
          >
            Create Account
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-[11px] text-gray-500">Or sign up with</span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>
        </Form>

        {/* Google */}
        <Button
          onClick={handleGoogleSignIn}
          type="button"
          variant="secondary"
          className="h-9 mt-3 w-full rounded-none border border-gray-200 bg-white text-xs font-medium text-gray-800 hover:bg-gray-50"
        >
          <span className="mr-1 text-sm font-bold text-[#4285F4]">
            <FcGoogle />
          </span>
          Sign Up With Google
        </Button>

        {/* Sign In */}
        <p className="mt-4 text-center text-[11px] text-gray-500">
          Already have an account?
          <a
            href="/login"
            className="font-medium text-[#18a7c2] hover:underline"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}
