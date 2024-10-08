import { initPocketBaseServer } from "@/lib";
import { redirect } from "next/navigation"; // Adjust based on your routing setup
import { Header } from "./header";
import PocketBase from "pocketbase";

interface PageWrapperProps {
  title: string;
  children: React.ReactNode;
}

export async function PageWrapper({ title, children }: PageWrapperProps) {
  const pb = await initPocketBaseServer();

  if (!pb.authStore.isValid) {
    redirect("/welcome");
  }

  return (
    <div className="flex flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
        </div>
        {children}
      </main>
    </div>
  );
}
