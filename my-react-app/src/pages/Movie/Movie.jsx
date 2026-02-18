// Movie.jsx — Страница фильма
// Получает id из URL через useParams(), загружает данные через fetchMovieById()

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchMovieById } from '../../data/movies'
import BookmarkButton from '../../components/BookmarkButton/BookmarkButton'
import styles from './Movie.module.css'

function Movie() {
  const { id } = useParams()  // id из URL: /movie/:id
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // При каждом изменении id — загружаем новый фильм
    fetchMovieById(id).then((data) => {
      setMovie(data)
      setLoading(false)
    })
  }, [id])

  if (loading) return <div className={styles.loading}>Загрузка...</div>
  if (!movie) return <div className={styles.loading}>Фильм не найден</div>

  return (
    <div>
      {/* ===== ВЕРХНЯЯ ЧАСТЬ — фон + постер + инфо ===== */}
      <section className={styles.hero}>
        {/* Размытый фон */}
        <div
          className={styles.backdrop}
          style={{ backgroundImage: `url(${movie.backdrop || movie.poster})` }}
        />

        <div className={styles.heroInner}>
          {/* Постер */}
          <div className={styles.poster}>
            <img src={movie.poster} alt={movie.title} />
          </div>

          {/* Детали */}
          <div className={styles.details}>
            <div className={styles.genres}>
              {movie.genres.map((g) => (
                <span key={g} className={styles.genre}>{g}</span>
              ))}
            </div>

            <h1 className={styles.title}>{movie.title}</h1>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <div className={styles.statLabel}>Рейтинг</div>
                <div className={`${styles.statValue} ${styles.accent}`}>★ {movie.rating}</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statLabel}>Год</div>
                <div className={styles.statValue}>{movie.year}</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statLabel}>Продолжит.</div>
                <div className={styles.statValue}>{movie.duration} мин</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statLabel}>Возраст</div>
                <div className={styles.statValue}>{movie.age}+</div>
              </div>
            </div>

            <p className={styles.desc}>{movie.description}</p>

            <div className={styles.actions}>
              <button className={styles.btnPlay}>▶ Смотреть</button>
              <div className={styles.bookmarkWrap}>
                <BookmarkButton movieId={movie.id} />
              </div>
              <button className={styles.btnBack} onClick={() => navigate(-1)}>
                ← Назад
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ПЛЕЕР-ЗАГЛУШКА ===== */}
      <section className={styles.playerWrap}>
        <div className={styles.player}>
          <div className={styles.playerInner}>
            <div className={styles.playCircle}>▶</div>
            <p>Нажмите для воспроизведения</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Movie
