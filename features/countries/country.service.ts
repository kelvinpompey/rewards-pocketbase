import { useQuery } from "@tanstack/react-query";
import PocketBase, { RecordModel } from "pocketbase";

export interface CountryModel extends RecordModel {
  name: string;
  isoCode: string;
  dialingCode: string;
}

export const getCountries = (pb: PocketBase) => {
  return pb.collection("countries").getList<CountryModel>(1, 200);
};

export const useCountries = (pb: PocketBase) =>
  useQuery({
    queryKey: ["countries"],
    queryFn: () => getCountries(pb),
  });
