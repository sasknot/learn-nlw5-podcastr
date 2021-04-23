import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import { AxiosResponse } from 'axios'

import api, { formatEpisode } from '../services/api'
import { usePlayer } from '../contexts/player-context'
import styles from './home.module.scss'

type HomeProps = {
  episodes: Array<Podcastr.Episode>
  lastestEpisodes: Array<Podcastr.Episode>
  allEpisodes: Array<Podcastr.Episode>
}

export default function Home (props: HomeProps) {
  const { episodes, lastestEpisodes, allEpisodes } = props
  const { playList } = usePlayer()
  const episodeList = [...lastestEpisodes, ...allEpisodes]

  return (
    <div className={styles.homepage}>
      <Head>
        <title>Home | Podcastr</title>
      </Head>

      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>
        <ul>
          {
            lastestEpisodes.map((episode: Podcastr.Episode, index: number) => {
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

                  <button type="button" onClick={() => playList(episodeList, index)}>
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
              allEpisodes.map((episode: Podcastr.Episode, index: number) => {
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
                      <button
                        type="button"
                        onClick={() => playList(episodeList, index + lastestEpisodes.length)}
                      >
                        <img src="/play-green.svg" alt="Tocar episódio" />
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

export const getStaticProps: GetStaticProps = async () => {
  const { data }: AxiosResponse<Podcastr.Episode[]> = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })
  const episodes: Podcastr.Episode[] = data.map(formatEpisode)
  const lastestEpisodes: Podcastr.Episode[] = episodes.slice(0, 2)
  const allEpisodes: Podcastr.Episode[] = episodes.slice(2, episodes.length)

  return {
    props: {
      episodes,
      lastestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60 * 8 // 8 hours
  }
}
