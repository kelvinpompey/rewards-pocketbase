"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginAction } from "@/features/auth/actions";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const { execute, result } = useAction(loginAction, {
    onSettled(data) {
      console.log("on settled ", data);

      if (data.result.data?.success) {
        router.replace("/");
      }
    },
  });

  console.log("login result ", result);
  return (
    <div className="flex flex-col items-center justify-items-center p-8 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col w-full max-w-md gap-4">
        <div className="flex flex-row text-3xl font-bold">
          <div className="text-gray-500">Login</div>
        </div>

        <form className="flex flex-col gap-4" action={execute}>
          <div>
            <span className=" text-red-500">
              {result.validationErrors?.email?.[0]}
            </span>
            <Input placeholder="Email" name="email" />
          </div>

          <div>
            <span className=" text-red-500">
              {result.validationErrors?.password?.[0]}
            </span>
            <Input placeholder="Password" name="password" />
          </div>

          <Button type="submit">Login</Button>
          <div className="text-center">Or</div>
          <Button>Signin</Button>
        </form>
      </div>
    </div>
  );
}
