import { NoOrganizations } from "./no-organizations";
import { ListResult } from "pocketbase";
import { OrganizationModel } from "../organization.service";
import { OrganizationItem } from "./organization.item";

type OrganizationListProps = {
  organizations: ListResult<OrganizationModel>;
};

export const OrganizationList = ({ organizations }: OrganizationListProps) => {
  if (organizations?.totalItems === 0) {
    return <NoOrganizations />;
  }

  return (
    <div
      className="flex flex-1 flex-col rounded-lg border border-dashed shadow-sm"
      x-chunk="dashboard-02-chunk-1"
    >
      {organizations.items.map((item) => (
        <OrganizationItem item={item} />
      ))}
    </div>
  );
};
