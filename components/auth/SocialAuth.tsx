import Button from "@/components/common/Button";
import { Loginredirect } from "@/routes";

import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa6";

const SocialAuth = () => {
  const handleSubmit = (provider: "github" | "google") => {
    signIn(provider, {
      redirectTo: Loginredirect,
    });
  };

  return (
    <div className="mt-4 flex flex-col items-center gap-3 w-full sm:flex-row sm:justify-center sm:items-center sm:gap-4">
      <Button
        type="button"
        label="Continue With Google"
        icon={FaGoogle}
        outline
        className="w-full sm:w-auto"
        onClick={() => {
          handleSubmit("google");
        }}
      />
      <Button
        type="button"
        label="Continue With Github"
        icon={FaGithub}
        outline
        className="w-full sm:w-auto"
        onClick={() => {
          handleSubmit("github");
        }}
      />
    </div>
  );
};

export default SocialAuth;
