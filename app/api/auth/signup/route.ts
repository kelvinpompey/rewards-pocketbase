import { initPocketBaseServer } from "@/lib";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const pb = await initPocketBaseServer();
  const body = await request.json();

  let result = await pb
    .collection("users")
    .create({
      email: body.email,
      password: body.password,
      passwordConfirm: body.password,
    });

  console.log("create user result ", result);

  let authData;

  if (result) {
    authData = await pb
      .collection("users")
      .authWithPassword(body.email, body.password);
    pb.collection("users").requestVerification(body.email).then(console.log);
  }

  /*

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
  } */

  return NextResponse.json(JSON.stringify(authData));
}
