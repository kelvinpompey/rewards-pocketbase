import PocketBase from "pocketbase";
import { UserModel } from "./types";

export const getUserModel = (pb: PocketBase) => {
  const user = pb.authStore.model as UserModel;

  return user;
};
