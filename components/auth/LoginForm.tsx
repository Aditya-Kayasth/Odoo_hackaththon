"use client";

import { loginSchema, LoginSchemaType } from "@/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormField from "@/components/common/FormField";
import Button from "@/components/common/Button";
import Heading from "@/components/common/Heading";
import SocialAuth from "./SocialAuth";
import { useState, useTransition } from "react";
import logIn from "@/actions/auth/login";
import Alert from "../common/Alert";
import { useRouter, useSearchParams } from "next/navigation";
import { Loginredirect } from "@/routes";
import Link from "next/link";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const [error, seterror] = useState<string | undefined>("");
  const [success, setsuccess] = useState<string | undefined>("");
  const router = useRouter();
  const [isLoading, setLoading] = useTransition();

  const searchParams = useSearchParams();

  const errorURL =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email in use with different provider"
      : "";

  const onSubmit = (data: LoginSchemaType) => {
    seterror("");

    setLoading(() => {
      logIn(data).then((res) => {
        if (res?.error) {
          router.replace("/login");
          seterror(res?.error);
        }
        if (!res?.error) {
          setsuccess(res?.success);
          router.push(Loginredirect);
        }
      });
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full max-w-[95vw] sm:max-w-[400px] md:max-w-[500px] m-auto mt-8 gap-2 px-2"
    >
      <Heading title={`Login to  B-LOGGER`} center lg />
      <FormField
        id="email"
        placeholder="Email"
        register={register}
        errors={errors}
      />
      <FormField
        id="password"
        type="password"
        placeholder="Password"
        register={register}
        errors={errors}
      />

      {error && <Alert message={error} error />}
      {success && <Alert message={success} success />}

      <Button
        label={isLoading ? "Loading..." : "Login"}
        disabled={isLoading}
        type="submit"
        outline={true}
      />

      <div className="flex items-center my-2 w-full">
        <hr className="flex-grow border-t border-gray-300 dark:border-gray-800" />
        <span className="mx-2 text-gray-500 text-sm dark:text-gray-700">
          OR
        </span>
        <hr className="flex-grow border-t border-gray-300 dark:border-gray-800" />
      </div>
      <div className="flex flex-col items-center w-full">
        {errorURL && <Alert message={errorURL} error />}
        <SocialAuth />
      </div>
      <div className="flex justify-center mt-4 text-sm text-gray-500 dark:text-gray-400">
        <Link href={"/passwordResetEmail"}>Forgot Password?</Link>
      </div>
    </form>
  );
};

export default LoginForm;
