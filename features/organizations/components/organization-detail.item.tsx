import Image from "next/image";
import {
  OrganizationModel,
  OrganizationModelWithCountry,
} from "../organization.service";
import { getFileUrl } from "@/lib";
import Link from "next/link";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";

type OrganizationItemProps = {
  item: OrganizationModelWithCountry;
};
export const OrganizationDetailItem = ({ item }: OrganizationItemProps) => {
  return (
    <div className="flex flex-col">
      <div key={item.id} className="p-2 flex flex-row items-center gap-2">
        <Image
          width={36}
          height={36}
          src={getFileUrl(item.collectionName, item.id, item.logo)}
          alt="Organization Logo"
        />
        <Link href={`/organizations/${item.id}`}>
          <div className="text-3xl text-neutral-700 font-bold">{item.name}</div>
        </Link>
        <div>
          <Link href={`/organizations/${item.id}/edit`}>
            <Button>
              <EditIcon className="h-5 w-5" />
              <span className=" pl-2">Edit</span>
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <Label className="font-bold">About</Label>
          <div>{item.description}</div>
        </div>

        <div>
          <Label className="font-bold">Email</Label>
          <div>{item.email}</div>
        </div>

        <div>
          <Label className="font-bold">Address</Label>
          <div>{item.address}</div>
        </div>

        <div>
          <Label className="font-bold">Country</Label>
          <div>{item.expand.country.name}</div>
        </div>
      </div>
    </div>
  );
};
