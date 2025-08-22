"use client";
import { BlogSchema, BlogSchemaType } from "@/schemas/BlogSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import FormField from "../common/FormField";
import AddCover from "./AddCover";
import { useState } from "react";

import CoverImage from "./CoverImage";

const CreateBlogForm = () => {
  const session = useSession();

  const userId = session.data?.user.id;

  const [uploadedCover, setUploadedCover] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BlogSchemaType>({
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      userId,
      isPublic: false,
    },
  });

  console.log("Success>>>>>>>", uploadedCover);

  return (
    <form>
      <div>
        {!!uploadedCover && <CoverImage url={uploadedCover} isEditor={true} setUploadedCover={setUploadedCover}/>}
        {!uploadedCover && <AddCover setUploadedCover={setUploadedCover} />}
        
        <FormField
          id="title"
          placeholder="Enter Blog Title"
          register={register}
          errors={errors}
          disabled={false}
          inputClassName="border-none text-6xl font-bold  px-0 "
        ></FormField>
      </div>
    </form>
  );
};

export default CreateBlogForm;
