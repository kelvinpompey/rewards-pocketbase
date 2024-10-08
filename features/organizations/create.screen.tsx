import { PageWrapper } from "@/components/page-wrapper";
import { OrganizationForm } from "./components/organization.form";
import { getCountries } from "../countries/country.service";
import { initPocketBaseServer } from "@/lib";

export async function CreateOrganization() {
  const pb = await initPocketBaseServer();
  const countries = await getCountries(pb);

  return (
    <PageWrapper title="Create Organization">
      <OrganizationForm countries={countries} />
    </PageWrapper>
  );
}
