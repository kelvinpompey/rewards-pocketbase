import PocketBase, { RecordModel } from "pocketbase";
import * as auth from "../auth/utils";

export interface OrganizationModel extends RecordModel {
  name: string;
  address: string;
  logo: string;
}

export const getUserOrganizations = (pb: PocketBase) => {
  const user = auth.getUserModel(pb);
  return pb.collection("organizations").getList<OrganizationModel>(1, 10, {
    filter: pb.filter("user = {:userId}", { userId: user.id }),
  });
};

export const getUserOrganization = (pb: PocketBase, id: string) => {
  return pb.collection("organizations").getOne<OrganizationModel>(id, {
    expand: "country",
  });
};
