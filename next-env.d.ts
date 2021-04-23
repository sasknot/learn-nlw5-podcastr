/// <reference types="next" />
/// <reference types="next/types/global" />

declare namespace Podcastr {
  type EpisodeFile = {
    url: string
    type: string
    duration: number
    duration_formatted?: string
  }

  type Episode = {
    id: string
    title: string
    members: string
    published_at: string
    thumbnail: string
    description: string
    file: EpisodeFile
    published_at_formatted?: string
  }
}
