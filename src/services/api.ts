import axios from 'axios'
import { format, convertDurationToTimeString } from '../utils/date'

export default axios.create({
  baseURL: 'http://localhost:3333'
})

export function formatEpisode (episode: Podcastr.Episode): Podcastr.Episode {
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
