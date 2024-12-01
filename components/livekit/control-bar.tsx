"use client"

import { cn } from "@/lib/utils";
import { supportsScreenSharing } from '@livekit/components-core';
import { MediaDeviceMenu, TrackToggle, usePersistentUserChoices } from "@livekit/components-react";
import { Track } from "livekit-client";
import * as React from 'react';

interface ControlBarProps extends React.HTMLAttributes<HTMLDivElement> {
  onDeviceError?: (error: { source: Track.Source; error: Error }) => void
}

export function ControlBar({ className, onDeviceError, ...props }: ControlBarProps) {
  const browserSupportsScreenSharing = supportsScreenSharing();

  const {
    saveAudioInputEnabled,
    saveVideoInputEnabled,
    saveAudioInputDeviceId,
    saveVideoInputDeviceId,
  } = usePersistentUserChoices({ preventSave: false });


  const microphoneOnChange = React.useCallback(
    (enabled: boolean, isUserInitiated: boolean) =>
      isUserInitiated ? saveAudioInputEnabled(enabled) : null,
    [saveAudioInputEnabled],
  );

  const cameraOnChange = React.useCallback(
    (enabled: boolean, isUserInitiated: boolean) =>
      isUserInitiated ? saveVideoInputEnabled(enabled) : null,
    [saveVideoInputEnabled],
  );

  return (
    <div className={cn("flex items-center justify-center gap-2 p-4 bg-background/80 backdrop-blur-sm", className)} {...props}>
      <TrackToggle
        source={Track.Source.Microphone}
        onChange={microphoneOnChange}
        onDeviceError={(error) => onDeviceError?.({ source: Track.Source.Microphone, error })}
      />
      <div className="lk-button-group-menu">
        <MediaDeviceMenu
          kind="audioinput"
          onActiveDeviceChange={(_kind, deviceId) => saveAudioInputDeviceId(deviceId ?? '')}
        />
      </div>

      <TrackToggle
        source={Track.Source.Camera}
        onChange={cameraOnChange}
        onDeviceError={(error) => onDeviceError?.({ source: Track.Source.Camera, error })}
      />
      <div className="lk-button-group-menu">
        <MediaDeviceMenu
          kind="videoinput"
          onActiveDeviceChange={(_kind, deviceId) => saveVideoInputDeviceId(deviceId ?? '')}
        />
      </div>

      {browserSupportsScreenSharing && (
        <TrackToggle
          source={Track.Source.ScreenShare}
          captureOptions={{ audio: true, selfBrowserSurface: 'include' }}
          onDeviceError={(error) => onDeviceError?.({ source: Track.Source.ScreenShare, error })}
        />
      )}
    </div >
  )
}
