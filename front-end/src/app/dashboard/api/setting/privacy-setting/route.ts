import { getAccessToken } from "@/services/AuthService";
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { PrivacySetting } from "@/types/setting";
import { PrivacySettingResponse } from "@/types/response";

export async function PUT(request: NextRequest) {
  const accessToken = await getAccessToken(true);

  if (!accessToken) {
    console.log("Faulty access token");
    return;
  }

  let body: PrivacySetting = await request.json();

  console.log(`Updating privacy setting with new data ${JSON.stringify(body)}`);
  try {
    const res = await fetch(`${process.env.UPDATE_PRIVACY_SETTING}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
        const resBody = await res.json() as PrivacySettingResponse;
      return NextResponse.json(resBody.data);
    }
    return NextResponse.error();
  } catch (error) {
    console.log("Error updating privacy setting: " + error);
    return;
  }
}
