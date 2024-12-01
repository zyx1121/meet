"use client"

import { ControlBar } from "@/components/livekit/control-bar";
import { Separator } from "@/components/ui/separator";
import { generateCode } from '@/lib/utils';
import { isEqualTrackRef } from '@livekit/components-core';
import {
  CarouselLayout,
  FocusLayout,
  FocusLayoutContainer,
  GridLayout,
  LayoutContextProvider,
  LiveKitRoom,
  ParticipantTile,
  useCreateLayoutContext,
  usePinnedTracks,
  useTracks
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Room({ roomId }: { roomId: string }) {
  const router = useRouter()
  const [token, setToken] = useState("")
  const [userId] = useState(generateCode(6))
  const [username] = useState(`user-${userId}`)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let mounted = true

    const getToken = async () => {
      try {
        const resp = await fetch(
          `/api/livekit?room=${roomId}&username=${username}&id=${userId}`
        )
        const data = await resp.json()
        if (data.token && mounted) {
          setToken(data.token)
        } else if (mounted) {
          setError(new Error("No token in response"))
        }
      } catch (error) {
        if (mounted) {
          setError(error instanceof Error ? error : new Error("Unknown error"))
        }
      }
    }

    getToken()

    return () => {
      mounted = false
    }
  }, [roomId, userId, username])

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-red-500">Connection error: {error.message}</div>
      </div>
    )
  }

  if (!token) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">Connecting...</div>
      </div>
    )
  }

  return (
    <div className="h-screen w-full">
      <LiveKitRoom
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        token={token}
        connect={true}
        audio={false}
        video={false}
        data-lk-theme="default"
        className="h-full"
        onDisconnected={() => {
          router.push('/')
        }}
      >
        <div className="h-full">
          <VideoConferenceWrapper />
        </div>
      </LiveKitRoom>
    </div>
  )
}

function VideoConferenceWrapper() {
  const tracks = useTracks([
    { source: Track.Source.Camera, withPlaceholder: true },
    { source: Track.Source.ScreenShare, withPlaceholder: false },
  ], { updateOnlyOn: [], onlySubscribed: true })

  const layoutContext = useCreateLayoutContext();
  const focusTrack = usePinnedTracks(layoutContext)?.[0];
  const carouselTracks = tracks.filter((track) => !isEqualTrackRef(track, focusTrack));

  return (
    <div className="lk-video-conference">
      <LayoutContextProvider value={layoutContext}>
        <div className="lk-video-conference-inner">
          {!focusTrack ? (
            <div className="lk-grid-layout-wrapper">
              <GridLayout tracks={tracks}>
                <ParticipantTile />
              </GridLayout>
            </div>
          ) : (
            <div className="lk-focus-layout-wrapper">
              <FocusLayoutContainer>
                <CarouselLayout tracks={carouselTracks}>
                  <ParticipantTile />
                </CarouselLayout>
                <FocusLayout trackRef={focusTrack} />
              </FocusLayoutContainer>
            </div>
          )}
          <Separator />
          <ControlBar />
        </div>
      </LayoutContextProvider>
    </div>
  )
}
