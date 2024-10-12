import { PageWrapper } from "@/components/page-wrapper";
import { OrganizationForm } from "./components/organization.form";
import { getCountries } from "../countries/country.service";
import { initPocketBaseServer } from "@/lib";
import { getUserOrganization } from "./organization.service";

type EditOrganizationProps = {
  id: string;
};

export async function EditOrganization({ id }: EditOrganizationProps) {
  const pb = await initPocketBaseServer();
  const countries = await getCountries(pb);

  const organization = await getUserOrganization(pb, id);

  return (
    <PageWrapper title="Edit Organization">
      <OrganizationForm countries={countries} organization={organization} />
    </PageWrapper>
  );
}
