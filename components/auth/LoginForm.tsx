"use client";

import { loginSchema, LoginSchemaType } from "@/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormField from "@/components/common/FormField";
import Button from "@/components/common/Button";
import Heading from "@/components/common/Heading";
import SocialAuth from "./SocialAuth";
import { startTransition, useState, useTransition } from "react";
import logIn from "@/actions/auth/login";
import Altert from "../common/Altert";
import { useRouter } from "next/navigation";
import { Loginredirect } from "@/routes";

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

  const onSubmit = (data: LoginSchemaType) => {
    startTransition(() => {
      setsuccess("");
      seterror("");
      console.log("DATA >>>>>", data);
      logIn(data).then((res) => {
        if (res?.error) {
          seterror(res?.error);
          console.log("ERROR >>>>>", res?.error);
        }
        if (!res?.error) {
          return router.push(Loginredirect);
        }
        // if (res?.success) {
        //   setsuccess(res?.success);
        //   console.log("SUCCESS >>>>>", res?.success, res.email, res.pass);
        // }
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

      {error && <Altert message={error} error />}
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
        <SocialAuth />
      </div>
    </form>
  );
};

export default LoginForm;
