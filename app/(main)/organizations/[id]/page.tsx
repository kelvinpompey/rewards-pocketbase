import { OrganizationDetail } from "@/features/organizations/detail.screen";

type OrganizationDetailPageProps = {
  params: {
    id: string;
  };
};

export default function OrganizationDetailPage({
  params: { id },
}: OrganizationDetailPageProps) {
  return <OrganizationDetail organizationId={id} />;
}
