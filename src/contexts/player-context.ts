import { createContext } from 'react'

type PlayerContextData = {
  episodeList: Array<Podcastr.Episode>
  currentEpisodeIndex: number
  isPlaying: boolean
  play: (episode: Podcastr.Episode) => void
  togglePlay: () => void
  setPlayingState: (state: boolean) => void
}

export const PlayerContext = createContext({} as PlayerContextData)
