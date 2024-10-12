import { initPocketBaseServer } from "@/lib";
import { redirect } from "next/navigation"; // Adjust based on your routing setup
import { Header } from "./header";

interface PageWrapperProps {
  title: string;
  children: React.ReactNode;
  showTitle?: boolean;
}

export async function PageWrapper({
  title,
  children,
  showTitle = true,
}: PageWrapperProps) {
  const pb = await initPocketBaseServer();

  if (!pb.authStore.isValid) {
    redirect("/welcome");
  }

  return (
    <div className="flex flex-col">
      <Header />
      <main className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between">
          {showTitle ? (
            <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
          ) : null}
        </div>
        {children}
      </main>
    </div>
  );
}
