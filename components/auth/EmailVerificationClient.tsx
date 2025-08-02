"use client";
import { verifyEmail } from "@/actions/auth/emailVerification";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Heading from "../common/Heading";
import Alert from "../common/Alert";
import Button from "../common/Button";

const EmailVerificationClient = () => {

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [pending, setPending] = useState(true);

  const router = useRouter();

  useEffect(() => {

    setPending(true)
    if (!token) return setError("Verification token is missing!");

    
    verifyEmail(token).then(res => {

      setError(res.error);
      setSuccess(res.success);
    })
    setPending(false)
    
  }, [token]);

  return (
    <div className="max-w-xl mx-auto px-4 py-12 flex flex-col items-center gap-6 text-center">
      <Heading title="Email Verification" center />

      {pending && (
        <p className="text-sm text-gray-500 animate-pulse">Verifying email, please wait...</p>
      )}

      {success && <Alert message={success} success />}
      {error && <Alert message={error} error />}
      {success && (
        <Button
          type="button"
          label="Go to Login"
          onClick={() => router.push("/login")}
          className="mt-4"
        />
      )}
    </div>
  );
};

export default EmailVerificationClient;
