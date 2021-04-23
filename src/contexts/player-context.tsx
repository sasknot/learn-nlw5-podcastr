import { createContext, ReactNode, useContext, useState } from 'react'

type PlayerContextData = {
  episodeList: Array<Podcastr.Episode>
  currentEpisodeIndex: number
  isShuffling: boolean
  isPlaying: boolean
  isLooping: boolean
  hasPrevious: boolean
  hasNext: boolean
  playSingle (episode: Podcastr.Episode): void
  playList (list: Podcastr.Episode[], index: number): void
  toggleShuffle (): void
  togglePlay (): void
  toggleLoop (): void
  setPlayingState (state: boolean): void
  playPrevious (): void
  playNext (): void
  clearPlayerState (): void
}

type PlayerContextProviderProps = {
  children: ReactNode
}

export const PlayerContext = createContext({} as PlayerContextData)

export function PlayerContextProvider (props: PlayerContextProviderProps) {
  const { children } = props
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isShuffling, setIsShuffling] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)

  function playSingle (episode: Podcastr.Episode) {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
    setIsShuffling(false)
  }

  function playList (list: Podcastr.Episode[], index: number) {
    setEpisodeList(list)
    setCurrentEpisodeIndex(index)
    setIsPlaying(true)
  }

  function toggleShuffle () {
    setIsShuffling(!isShuffling)
  }

  function togglePlay () {
    setIsPlaying(!isPlaying)
  }

  function toggleLoop () {
    setIsLooping(!isLooping)
  }

  function setPlayingState (state: boolean) {
    setIsPlaying(state)
  }

  const hasPrevious = isShuffling || currentEpisodeIndex > 0
  const hasNext = isShuffling || ((currentEpisodeIndex + 1) < episodeList.length)

  function playPrevious () {
    if (isShuffling) {
      const prevRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
      setCurrentEpisodeIndex(prevRandomEpisodeIndex)
    } else if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1)
    }
  }

  function playNext () {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
      setCurrentEpisodeIndex(nextRandomEpisodeIndex)
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1)
    }
  }

  function clearPlayerState () {
    setEpisodeList([])
    setCurrentEpisodeIndex(0)
  }

  return (
    <PlayerContext.Provider value={{
      episodeList,
      currentEpisodeIndex,
      isShuffling,
      isPlaying,
      isLooping,
      hasPrevious,
      hasNext,
      playSingle,
      toggleShuffle,
      togglePlay,
      toggleLoop,
      setPlayingState,
      playList,
      playPrevious,
      playNext,
      clearPlayerState
    }}>
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => useContext(PlayerContext)
