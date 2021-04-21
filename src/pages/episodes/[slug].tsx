import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { AxiosResponse } from 'axios'

import styles from './styles.module.scss'
import api from '../../services/api'
import { Episode, formatEpisode } from '../index'

type EpisodeProps = {
  episode: Episode
}

export default function EpisodePage (props: EpisodeProps) {
  const { episode } = props
  const router = useRouter()

  return (
    <div className={styles.episode}>
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
        <button type="button">
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
  const { data }: AxiosResponse<Episode> = await api.get(`episodes/${slug}`)
  const episode: Episode = formatEpisode(data)

  return {
    props: {
      episode
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}
