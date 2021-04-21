import { format as _format, parseISO, Locale } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export const format = (_date: string | Date, format: string, locale: Locale = ptBR) => {
  let date = _date

  if (typeof date === 'string') {
    date = parseISO(date)
  }

  return _format(date, format, {
    locale
  })
}

export const convertDurationToTimeString = (duration: number): string => {
  const hours = Math.floor(duration / 3600)
  const minutes = Math.floor((duration % 3600) / 60)
  const seconds = duration % 60
  const timeString = [hours, minutes, seconds]
    .map((unit: number) => String(unit).padStart(2, '0'))
    .join(':')

  return timeString
}
