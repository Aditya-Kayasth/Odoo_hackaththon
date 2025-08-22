"use client";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  passwordResetFormSchemaType,
  passwordResetFormSchema,
} from "@/schemas/PasswordResetFormClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import FormField from "../common/FormField";
import Heading from "../common/Heading";
import Alert from "../common/Alert";
import Button from "../common/Button";
import PasswordReset from "@/actions/auth/passwordReset";
import PasswordFormReset from "@/actions/auth/passwordResetForm";

const PasswordResetClient = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<passwordResetFormSchemaType>({
    resolver: zodResolver(passwordResetFormSchema),
  });

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, seterror] = useState<string | undefined>("");
  const [success, setsuccess] = useState<string | undefined>("");
  const router = useRouter();
  const [isLoading, setLoading] = useTransition();

  const onSubmit = (data: passwordResetFormSchemaType) => {
    seterror("");

    setLoading(() => {
      PasswordFormReset(data, token).then((res) => {
        if (res?.error) {
          seterror(res?.error);
        }
        if (!res?.error) {
          setsuccess(res?.success);
        }
      });
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full max-w-[95vw] sm:max-w-[400px] md:max-w-[500px] m-auto mt-8 gap-2 px-2"
    >
      <Heading title={`Create new Password`} center lg />
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

      {!error && !success && (
        <Button
          label={isLoading ? "Loading..." : "Reset Password"}
          disabled={isLoading}
          type="submit"
          outline={true}
        />
      )}

      {success && (
        <Button
          type="button"
          label="Go to Login"
          onClick={() => router.push("/login")}
          className="mt-4"
        />
      )}
    </form>
  );
};

export default PasswordResetClient;
