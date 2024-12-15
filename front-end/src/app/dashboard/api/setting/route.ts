import { getAccessToken } from "@/services/AuthService";
import { InvitationNotificationResponse, PrivacySettingResponse } from "@/types/response";
import { Setting } from "@/types/setting";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest
): Promise<
  NextResponse<{ body?: Setting; message: string }>
> {
  const accessToken = await getAccessToken(true);

  try {
    console.log(`Fetching privacy setting`);
    const result = await fetch(
      `${process.env.FETCH_PRIVACY_SETTING}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        next: {
          revalidate: 0,
          tags: [`privacySetting`],
        },
      }
    );

    if (!result.ok) {
      return NextResponse.json(
        { message: "Failed to fetch privacy setting" },
        { status: 400 }
      );
    }

    const body = await result.json() as PrivacySettingResponse;
    console.log("Privacy Setting data: ", body);

    let settingData = {} as Setting
    settingData.privacy_setting = body.data
    return NextResponse.json({body: settingData, message: ""}, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}