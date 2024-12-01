import { AccessToken } from "livekit-server-sdk"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const room = req.nextUrl.searchParams.get("room")
    const username = req.nextUrl.searchParams.get("username")
    const id = req.nextUrl.searchParams.get("id")

    console.log("Token request params:", { room, username, id })

    if (!room) {
      return NextResponse.json(
        { error: "Missing room query parameter" },
        { status: 400 }
      )
    }
    if (!username) {
      return NextResponse.json(
        { error: "Missing username query parameter" },
        { status: 400 }
      )
    }
    if (!id) {
      return NextResponse.json(
        { error: "Missing id query parameter" },
        { status: 400 }
      )
    }

    const apiKey = process.env.LIVEKIT_API_KEY
    const apiSecret = process.env.LIVEKIT_API_SECRET
    const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL

    if (!apiKey || !apiSecret || !wsUrl) {
      console.error("Missing environment variables:", { apiKey, apiSecret, wsUrl })
      return NextResponse.json(
        { error: "Server misconfigured" },
        { status: 500 }
      )
    }

    const at = new AccessToken(apiKey, apiSecret, {
      identity: id,
      name: username,
    })

    at.addGrant({
      room,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
    })

    const token = await at.toJwt()
    console.log("Generated token:", token.substring(0, 20) + "...")

    return NextResponse.json({ token })
  } catch (error) {
    console.error("Error generating token:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}