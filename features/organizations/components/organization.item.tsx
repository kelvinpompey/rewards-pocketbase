import Image from "next/image";
import { OrganizationModel } from "../organization.service";
import { getFileUrl } from "@/lib";
import Link from "next/link";

type OrganizationItemProps = {
  item: OrganizationModel;
};
export const OrganizationItem = ({ item }: OrganizationItemProps) => {
  return (
    <div key={item.id} className="p-2 flex flex-row items-center gap-2">
      <Image
        width={36}
        height={36}
        src={getFileUrl(item.collectionName, item.id, item.logo)}
        alt="Organization Logo"
      />
      <Link href={`/organizations/${item.id}`}>
        <div className="text-1xl text-neutral-700">{item.name}</div>
      </Link>
    </div>
  );
};
