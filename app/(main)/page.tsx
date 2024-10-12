import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { getUserOrganizations } from "@/features/organizations/organization.service";
import { initPocketBaseServer } from "@/lib";
import { redirect } from "next/navigation";

export default async function Home() {
  const pb = await initPocketBaseServer();

  if (!pb.authStore.isValid) {
    redirect("/welcome");
  }

  console.log("authStore ", pb.authStore.model);
  const organizations = await getUserOrganizations(pb);
  console.log("organizations", organizations);

  return (
    <div className="flex flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
        </div>
        <div
          className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
          x-chunk="dashboard-02-chunk-1"
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no products
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start selling as soon as you add a product.
            </p>
            <Button className="mt-4">Add Product</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
