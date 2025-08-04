"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  PasswordResetSchema,
  PasswordResetSchemaType,
} from "@/schemas/PasswordResetSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import FormField from "../common/FormField";
import Heading from "../common/Heading";
import Alert from "../common/Alert";
import Button from "../common/Button";
import PasswordReset from "@/actions/auth/passwordReset";

const PasswordResetClient = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetSchemaType>({
    resolver: zodResolver(PasswordResetSchema),
  });

  const [error, seterror] = useState<string | undefined>("");
  const [success, setsuccess] = useState<string | undefined>("");
  const router = useRouter();
  const [isLoading, setLoading] = useTransition();

  const onSubmit = (data: PasswordResetSchemaType) => {
    seterror("");

    setLoading(() => {
      PasswordReset(data).then((res) => {
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
      <Heading title={`Reset Password`} center lg />
      <FormField
        id="email"
        placeholder="Email"
        register={register}
        errors={errors}
      />

      {error && <Alert message={error} error />}
      {success && <Alert message={success} success />}

      <Button
        label={isLoading ? "Loading..." : "Send Password Reset Link"}
        disabled={isLoading}
        type="submit"
        outline={true}
      />
    </form>
  );
};

export default PasswordResetClient;
