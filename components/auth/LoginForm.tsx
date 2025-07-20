"use client";
import { ImBlogger } from "react-icons/im";
import { loginSchema, LoginSchemaType } from "@/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormField from "@/components/common/FormField";
import Button from "@/components/common/Button";
import Heading from "@/components/common/Heading";
import SocialAuth from "./SocialAuth";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchemaType) => {};

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
      <Button label="Login" type="submit" outline={true} />

      <div className="flex items-center my-2 w-full">
        <hr className="flex-grow border-t border-gray-300 dark:border-gray-800" />
        <span className="mx-2 text-gray-500 text-sm dark:text-gray-700">OR</span>
        <hr className="flex-grow border-t border-gray-300 dark:border-gray-800" />
      </div>
      <div className="flex flex-col items-center w-full">
        <SocialAuth />
      </div>
    </form>
  );
};

export default LoginForm;
