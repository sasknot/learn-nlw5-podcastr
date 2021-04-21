import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { AxiosResponse } from 'axios'

import styles from './home.module.scss'
import { format, convertDurationToTimeString } from '../utils/date'
import api from '../services/api'

export type EpisodeFile = {
  url: string
  type: string
  duration: number
  duration_formatted?: string
}

export type Episode = {
  id: string
  title: string
  members: string
  published_at: string
  thumbnail: string
  description: string
  file: EpisodeFile
  published_at_formatted?: string
}

type HomeProps = {
  episodes: Array<Episode>
  lastestEpisodes: Array<Episode>
  allEpisodes: Array<Episode>
}

export default function Home (props: HomeProps) {
  const { episodes, lastestEpisodes, allEpisodes } = props

  return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>
        <ul>
          {
            lastestEpisodes.map((episode: Episode) => {
              return (
                <li key={episode.id}>
                  <Image
                    width={192}
                    height={192}
                    objectFit="cover"
                    src={episode.thumbnail}
                    alt={episode.title}
                  />

                  <div className={styles.episodeDetails}>
                    <Link href={`/episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                    <p>{episode.members}</p>
                    <span>{episode.published_at_formatted}</span>
                    <span>{episode.file.duration_formatted}</span>
                  </div>

                  <button type="button">
                    <img src="/play-green.svg" alt="Tocar episódio" />
                  </button>
                </li>
              )
            })
          }
        </ul>
      </section>
      <section className={styles.allEpisodes}>
        <h2>Todos episódios</h2>

        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              allEpisodes.map((episode: Episode) => {
                return (
                  <tr key={episode.id}>
                    <td style={{ width: 72 }}>
                      <Image
                        width={120}
                        height={120}
                        objectFit="cover"
                        src={episode.thumbnail}
                        alt={episode.title}
                      />
                    </td>
                    <td>
                      <Link href={`/episodes/${episode.id}`}>
                        <a>{episode.title}</a>
                      </Link>
                    </td>
                    <td>
                      {episode.members}
                    </td>
                    <td style={{ width: 100 }}>
                      {episode.published_at_formatted}
                    </td>
                    <td>
                      {episode.file.duration_formatted}
                    </td>
                    <td>
                      <button type="button">
                        <img src="/play-green.svg" alt="Tocar episódio"/>
                      </button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </section>
    </div>
  )
}

export function formatEpisode (episode: Episode): Episode {
  return {
    ...episode,
    published_at_formatted: format(episode.published_at, 'd MMM yy'),
    file: {
      ...episode.file,
      duration: Number(episode.file.duration),
      duration_formatted: convertDurationToTimeString(episode.file.duration)
    }
  }
}

export const getStaticProps: GetStaticProps = async () => {
  const { data }: AxiosResponse<Episode[]> = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })
  const episodes: Episode[] = data.map(formatEpisode)
  const lastestEpisodes: Episode[] = episodes.slice(0, 2)
  const allEpisodes: Episode[] = episodes.slice(2, episodes.length)

  return {
    props: {
      episodes,
      lastestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60 * 8 // 8 hours
  }
}
