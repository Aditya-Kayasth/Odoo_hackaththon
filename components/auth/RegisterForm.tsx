"use client";

import { registerSchema, RegisterSchemaType } from "@/schemas/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormField from "@/components/common/FormField";
import Button from "@/components/common/Button";
import Heading from "@/components/common/Heading";
import SocialAuth from "./SocialAuth";
import signUp from "@/actions/auth/register";
import { useState, useTransition } from "react";
import Alert from "../common/Alert";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const [error, seterror] = useState<string | undefined>("");
  const [success, setsuccess] = useState<string | undefined>("");

  const [isLoading, setLoading] = useTransition();

  const onSubmit = (data: RegisterSchemaType) => {
    setsuccess("");
    seterror("");
    setLoading(() => {
      signUp(data).then((res) => {
        seterror(res.error);
        setsuccess(res.success);
      });
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full max-w-[95vw] sm:max-w-[400px] md:max-w-[500px] m-auto mt-8 gap-2 px-2"
    >
      <Heading title={`Register to  B-LOGGER`} center lg />
      <FormField
        id="name"
        placeholder="Enter name"
        register={register}
        errors={errors}
        disabled={isLoading}
      />
      <FormField
        id="email"
        placeholder="Enter email"
        register={register}
        errors={errors}
        disabled={isLoading}
      />
      <FormField
        id="password"
        type="password"
        placeholder="Enter password"
        register={register}
        errors={errors}
        disabled={isLoading}
      />
      <FormField
        id="confirmPassword"
        type="password"
        placeholder="Confirm password"
        register={register}
        errors={errors}
        disabled={isLoading}
      />

      {error && <Alert message={error} error />}
      {success && <Alert message={success} success />}

      <Button
        label={isLoading ? "Loading..." : "Register"}
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
        <SocialAuth />
      </div>
    </form>
  );
};

export default RegisterForm;
