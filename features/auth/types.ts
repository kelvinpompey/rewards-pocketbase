import PocketBase, { RecordModel } from "pocketbase";

export interface UserModel extends RecordModel {
  name: string;
  email: string;
}
