import { GetStaticPropsResult } from 'next'

const apiBaseUrl: string = 'http://localhost:3333'

interface Episode {
  id: string
  title: string
  members: string
  published_at: string
  thumbnail: string
  description: string
  file: {
    url: string
    type: string
    duration: number
  }
}

type HomeProps = {
  episodes: Array<Episode>
}

export default function Home (props: HomeProps) {
  return (
    <div>
      <h1>Index</h1>
      <span>{JSON.stringify(props.episodes)}</span>
    </div>
  )
}

export async function getStaticProps () {
  const response: Response = await fetch(`${apiBaseUrl}/episodes`)
  const data: Episode[] = await response.json()

  return {
    props: {
      episodes: data
    },
    revalidate: 60 * 60 * 8
  } as GetStaticPropsResult<HomeProps>
}
