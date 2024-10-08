import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { getUserOrganizations } from "@/features/organizations/organization.service";
import { initPocketBaseServer } from "@/lib";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { OrganizationList } from "./components/organization.list";

export async function OrganizationHome() {
  const pb = await initPocketBaseServer();

  if (!pb.authStore.isValid) {
    redirect("/welcome");
  }
  const organizations = await getUserOrganizations(pb);
  console.log("organizations", organizations);

  return (
    <div className="flex flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold md:text-2xl">Organizations</h1>
          <Link href="/organizations/create">
            <Button>
              <PlusIcon />
            </Button>
          </Link>
        </div>
        <OrganizationList organizations={organizations} />
      </main>
    </div>
  );
}
