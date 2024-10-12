import { EditOrganization } from "@/features/organizations/edit.screen";

type EditOrganizationPageProps = {
  params: {
    id: string;
  };
};

export default function EditOrganizationPage({
  params: { id },
}: EditOrganizationPageProps) {
  return <EditOrganization id={id} />;
}
