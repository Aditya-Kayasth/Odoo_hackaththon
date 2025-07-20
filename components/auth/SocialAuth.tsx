import Button from "@/components/common/Button";
import { FaGithub, FaGoogle } from "react-icons/fa6";

const SocialAuth = () => {
  return (
    <div className="mt-4 flex flex-col items-center gap-3 w-full sm:flex-row sm:justify-center sm:items-center sm:gap-4">
      <Button
        label="Continue With Google"
        icon={FaGoogle}
        outline
        className="w-full sm:w-auto"
        onClick={() => {}}
      />
      <Button
        label="Continue With Github"
        icon={FaGithub}
        outline
        className="w-full sm:w-auto"
        onClick={() => {}}
      />
    </div>
  );
};

export default SocialAuth;
