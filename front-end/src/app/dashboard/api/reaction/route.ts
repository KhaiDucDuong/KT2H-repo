import { getAccessToken } from "@/services/AuthService";
import { ContactResponse, ReactionResponse } from "@/types/response";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest
): Promise<NextResponse<{ body?: ReactionResponse; message: string }>> {
  const searchParams = request.nextUrl.searchParams;
  const messageId = searchParams.get("messageId");
  const accessToken = await getAccessToken(true);

  try {
    const result = await fetch(
      `${process.env.FETCH_REACTION_MESSAGES}/${messageId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        next: {
            revalidate: 0
        //   revalidate: 300,
        //   tags: [`conversation-${conversationId}`],
        },
      }
    );

    if (!result.ok) {
      return NextResponse.json(
        { message: "Failed to fetch messages in conversation" },
        { status: 400 }
      );
    }
    const data = await result.json();
    console.log("Conversation messages data: ", data);
    return NextResponse.json(data as ReactionResponse, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
