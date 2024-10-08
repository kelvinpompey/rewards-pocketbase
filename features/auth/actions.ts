"use server"; // don't forget to add this!

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { zfd } from "zod-form-data";
import { initPocketBaseServer } from "@/lib";
import { cookies } from "next/headers";
import { getTokenPayload } from "pocketbase";
import { flattenValidationErrors } from "next-safe-action";

// This schema is used to validate input from client.
const schema = zfd.formData({
  email: z.string().min(3),
  password: z.string().min(8).max(100),
});

export const loginAction = actionClient
  .schema(schema, {
    handleValidationErrorsShape: (ve, utils) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { email, password } }) => {
    const pb = await initPocketBaseServer();

    let authData;

    try {
      authData = await pb.collection("users").authWithPassword(email, password);
    } catch (err) {
      console.log("auth error ", err);
      return { failure: "Incorrect credentials" };
    }

    console.log("authData", authData);

    const payload = getTokenPayload(pb.authStore.token);

    console.log("payload ", payload);

    if (authData) {
      cookies().set("pb_auth", JSON.stringify({ token: pb.authStore.token }), {
        path: "/",
        secure: false,
        httpOnly: true,
        sameSite: "strict",
        expires: new Date(payload.exp * 1000),
      });

      //redirect("/");
      return {
        success: "Successfully logged in",
      };
    }

    return { failure: "Incorrect credentials" };
  });

export const logoutAction = actionClient.action(async () => {
  const pb = await initPocketBaseServer();

  let authData;

  try {
    authData = await pb.authStore.clear();
    cookies().set("pb_auth", "", {
      expires: new Date(0), // Set the expiry date to a past date
      path: "/", // Ensure the path is set correctly
    });
  } catch (err) {
    console.log("auth error ", err);
    return { failure: "Error logging out" };
  }

  //redirect("/");
  return {
    success: "Successfully logged out",
  };
});
