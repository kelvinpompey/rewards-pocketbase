import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import PocketBase from "pocketbase";

export async function initPocketBaseServer() {
  const pocketbase: PocketBase = new PocketBase(
    process.env.NEXT_PUBLIC_POCKET_BASE_URL
  );

  let response = NextResponse.next();

  const authCookie = cookies().get("pb_auth");

  console.log("authCookie ", authCookie);
  if (authCookie) {
    pocketbase.authStore.loadFromCookie(
      `${authCookie.name}=${authCookie.value}`
    );

    try {
      if (pocketbase.authStore.isValid) {
        await pocketbase.collection("users").authRefresh();
      }
    } catch (error) {
      console.log("cookie invalid ", error);
      pocketbase.authStore.clear();
    }
  }

  pocketbase.authStore.onChange(() => {
    response?.headers.set("set-cookie", pocketbase.authStore.exportToCookie());
  });

  return pocketbase;
}

export async function initPocketBaseClient() {
  const pocketbase: PocketBase = new PocketBase(
    process.env.NEXT_PUBLIC_POCKET_BASE_URL
  );

  pocketbase.authStore.loadFromCookie(document.cookie);

  pocketbase.authStore.onChange(() => {
    document.cookie = pocketbase.authStore.exportToCookie({
      httpOnly: false,
    });
  });

  return pocketbase;
}

export const getFileUrl = (
  collection: string,
  recordId: string,
  filename: string
) => {
  return `${process.env.NEXT_PUBLIC_POCKET_BASE_URL}/api/files/${collection}/${recordId}/${filename}?thumb=100x100`;
};
