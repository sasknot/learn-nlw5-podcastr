import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import { AxiosResponse } from 'axios'

import api, { formatEpisode } from '../../services/api'
import styles from './styles.module.scss'
import { usePlayer } from '../../contexts/player-context'

type EpisodeProps = {
  episode: Podcastr.Episode
}

export default function EpisodePage (props: EpisodeProps) {
  const { episode } = props
  const router = useRouter()
  const { playSingle } = usePlayer()

  return (
    <div className={styles.episode}>
      <Head>
        <title>{episode.title} | Podcastr</title>
      </Head>

      <div className={styles.thumbnailContainer}>
        <Link href="/">
          <button type="button">
            <img src="/arrow-left.svg" alt="Voltar" />
          </button>
        </Link>
        <Image
          width={700}
          height={160}
          objectFit="cover"
          src={episode.thumbnail}
        />
        <button type="button" onClick={() => playSingle(episode)}>
          <img src="/play.svg" alt="Tocar episódio" />
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.published_at_formatted}</span>
        <span>{episode.file.duration_formatted}</span>
      </header>

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params
  const { data }: AxiosResponse<Podcastr.Episode> = await api.get(`episodes/${slug}`)
  const episode: Podcastr.Episode = formatEpisode(data)

  return {
    props: {
      episode
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}
