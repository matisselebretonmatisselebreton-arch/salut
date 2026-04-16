/**
 * Wrapper Audio : musique de fond + voix off optionnelle, avec ducking
 * (la musique baisse quand la voix off joue).
 */
import { Audio, useVideoConfig } from "remotion";

export interface BackgroundAudioProps {
  musicUrl: string | null;
  voiceOverUrl: string | null;
  /** Volume musique seul (0-1). */
  musicVolume?: number;
  /** Volume musique pendant la voix off (0-1). */
  duckedVolume?: number;
}

export const BackgroundAudio: React.FC<BackgroundAudioProps> = ({
  musicUrl,
  voiceOverUrl,
  musicVolume = 0.6,
  duckedVolume = 0.18,
}) => {
  const { durationInFrames } = useVideoConfig();
  const hasVoice = Boolean(voiceOverUrl);
  const finalMusicVolume = hasVoice ? duckedVolume : musicVolume;

  return (
    <>
      {musicUrl ? (
        <Audio src={musicUrl} volume={finalMusicVolume} endAt={durationInFrames} />
      ) : null}
      {voiceOverUrl ? <Audio src={voiceOverUrl} volume={1} /> : null}
    </>
  );
};
