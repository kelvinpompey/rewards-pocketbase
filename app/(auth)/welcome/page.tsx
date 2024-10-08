import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Welcome() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-row gap-2 text-3xl font-bold">
        <div className="text-gray-500">Safyah</div>
        <div className="text-orange-500">Rewards</div>
      </div>

      <div className="text-5xl font-bold text-center my-8 text-gray-700">
        A rewards a day keeps your customers from going away! :)
      </div>

      <Link href="/login">
        <Button>Get Started</Button>
      </Link>
    </div>
  );
}
