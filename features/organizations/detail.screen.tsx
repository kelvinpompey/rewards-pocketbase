import { PageWrapper } from "@/components/page-wrapper";
import { getUserOrganization } from "./organization.service";
import { initPocketBaseServer } from "@/lib";
import { OrganizationItem } from "./components/organization.item";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import { OrganizationDetailItem } from "./components/organization-detail.item";
import Link from "next/link";

type OrganizationDetailProps = {
  organizationId: string;
};

export async function OrganizationDetail({
  organizationId,
}: OrganizationDetailProps) {
  const pb = await initPocketBaseServer();
  const organization = await getUserOrganization(pb, organizationId);

  return (
    <PageWrapper title="Organization Detail" showTitle={false}>
      <Suspense fallback={<div>Loading</div>}>
        <OrganizationDetailItem item={organization} />
      </Suspense>
    </PageWrapper>
  );
}
