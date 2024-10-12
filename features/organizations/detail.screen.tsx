import { PageWrapper } from "@/components/page-wrapper";
import { getUserOrganization } from "./organization.service";
import { initPocketBaseServer } from "@/lib";
import { OrganizationItem } from "./components/organization.item";
import { Suspense } from "react";
import { CountryModel } from "../countries/country.service";

type OrganizationDetailProps = {
  organizationId: string;
};

export async function OrganizationDetail({
  organizationId,
}: OrganizationDetailProps) {
  const pb = await initPocketBaseServer();
  const organization = await getUserOrganization(pb, organizationId);

  console.log("organization detail ", organization);

  return (
    <PageWrapper title="Organization Detail">
      <Suspense fallback={<div>Loading</div>}>
        <OrganizationItem item={organization} />
      </Suspense>
    </PageWrapper>
  );
}
