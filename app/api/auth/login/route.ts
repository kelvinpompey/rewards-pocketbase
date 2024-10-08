import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getTokenPayload } from "pocketbase";
import { initPocketBaseServer } from "@/lib";

export async function POST(request: Request) {
  const pb = await initPocketBaseServer();
  const body = await request.json();

  const authData = await pb
    .collection("users")
    .authWithPassword(body.email, body.password);

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

    redirect("/");
  }

  //return NextResponse.json(JSON.stringify(authData));
}
