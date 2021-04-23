import { PlayerContext } from '../contexts/player-context'
import { Header } from "../components/header"
import { Player } from "../components/player"

import '../styles/global.scss'
import styles from '../styles/app.module.scss'
import { useState } from 'react'

function MyApp ({ Component, pageProps }) {
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(-1)
  const [isPlaying, setIsPlaying] = useState(false)

  function play (episode: Podcastr.Episode) {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  function togglePlay () {
    setIsPlaying(!isPlaying)
  }

  function setPlayingState (state: boolean) {
    setIsPlaying(state)
  }

  return (
    <PlayerContext.Provider value={{
      episodeList,
      currentEpisodeIndex,
      play,
      isPlaying,
      togglePlay,
      setPlayingState
    }}>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContext.Provider>
  )
}

export default MyApp
