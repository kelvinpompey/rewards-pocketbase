"use server"; // don't forget to add this!

import { actionClient } from "@/lib/safe-action";
import { initPocketBaseServer } from "@/lib";
import { flattenValidationErrors } from "next-safe-action";
import { organizationSchema } from "./types";
import { getUserModel } from "../auth/utils";
import { revalidatePath } from "next/cache";

export const createOrganizationAction = actionClient
  .schema(organizationSchema, {
    handleValidationErrorsShape: (ve, utils) => {
      console.log("transforming errors ", ve);
      return flattenValidationErrors(ve).fieldErrors;
    },
  })
  .action(
    async ({
      parsedInput: { email, name, logo, description, address, country },
    }) => {
      console.log("test ");
      const pb = await initPocketBaseServer();

      console.log("create data ", email, name, logo, description, address);

      let user = getUserModel(pb);

      try {
        let result = await pb.collection("organizations").create({
          email,
          name,
          logo,
          country,
          description,
          address,
          user: user.id,
        });

        revalidatePath("/organizations");

        console.log("result ", result);
        return { success: "Successfully created organization" };
      } catch (err) {
        return { failure: (err as Error).message };
      }
    }
  );

export const editOrganizationAction = actionClient
  .schema(organizationSchema, {
    handleValidationErrorsShape: (ve, utils) => {
      console.log("transforming errors ", ve);
      return flattenValidationErrors(ve).fieldErrors;
    },
  })
  .action(
    async ({
      parsedInput: { id, email, name, logo, description, address, country },
    }) => {
      const pb = await initPocketBaseServer();

      console.log(
        "update data ",
        id,
        email,
        name,
        logo,
        description,
        address,
        country
      );

      let user = getUserModel(pb);

      if (!id) {
        return { failure: "Id is required" };
      }

      try {
        let result = await pb.collection("organizations").update(id, {
          email,
          name,
          logo,
          country,
          description,
          address,
          user: user.id,
        });

        revalidatePath("/organizations");

        console.log("result ", result);
        return { success: "Successfully created organization" };
      } catch (err) {
        return { failure: (err as Error).message };
      }
    }
  );
