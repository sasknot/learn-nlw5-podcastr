import styles from './styles.module.scss'
import { format } from '../../utils/date'

export function Header () {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM')

  return (
    <header className={styles.headerContainer}>
      <img src="/logo.svg" alt="Podcastr" />

      <p>O melhor para você ouvir, sempre</p>

      <span>{currentDate}</span>
    </header>
  )
}
