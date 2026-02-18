// ============================================================
// MovieCard.jsx — карточка фильма
//
// Props:
//   movie — объект фильма из data/movies.js
//
// Что делает:
//   - Клик по карточке → переход на /movie/:id
//   - Кнопка закладки → toggleBookmark из BookmarksContext
//   - Hover-эффект через CSS (overlay с кнопкой Play)
// ============================================================

import { useNavigate } from 'react-router-dom'
import BookmarkButton from '../BookmarkButton/BookmarkButton'
import styles from './MovieCard.module.css'

function MovieCard({ movie }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/movie/${movie.id}`)
  }

  return (
    <div className={styles.card} onClick={handleClick}>
      {/* Постер */}
      <div className={styles.posterWrap}>
        <img
          src={movie.poster}
          alt={movie.title}
          className={styles.poster}
          // Если постер не загрузился — показываем заглушку
          onError={(e) => { e.target.style.display = 'none' }}
        />

        {/* Overlay появляется при наведении (CSS) */}
        <div className={styles.overlay}>
          <div className={styles.playBtn}>▶</div>
        </div>

        {/* Кнопка закладки — отдельный компонент */}
        {/* stopPropagation — чтобы клик по кнопке не открывал страницу фильма */}
        <div onClick={(e) => e.stopPropagation()}>
          <BookmarkButton movieId={movie.id} />
        </div>
      </div>

      {/* Информация под постером */}
      <div className={styles.info}>
        <div className={styles.title}>{movie.title}</div>
        <div className={styles.meta}>
          <span className={styles.year}>{movie.year}</span>
          <span className={styles.rating}>★ {movie.rating}</span>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
