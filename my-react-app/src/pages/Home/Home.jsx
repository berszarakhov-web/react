// ============================================================
// Home.jsx — Главная страница
//
// Разделы:
//   1. Hero-секция (большой баннер с первым фильмом)
//   2. Горизонтальная лента "Популярное"
//   3. Горизонтальная лента "Новинки"
//
// Данные загружаются через fetchMovies() из data/movies.js
// useEffect + useState — демонстрирует жизненный цикл компонента
// ============================================================

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchMovies } from '../../data/movies'
import MovieCard from '../../components/MovieCard/MovieCard'
import BookmarkButton from '../../components/BookmarkButton/BookmarkButton'
import styles from './Home.module.css'

function Home() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Загружаем фильмы при монтировании компонента
  useEffect(() => {
    fetchMovies().then((data) => {
      setMovies(data)
      setLoading(false)
    })
  }, [])

  // Первый фильм — в Hero-секцию
  const hero = movies[0]
  // Популярные — первые 6
  const popular = movies.slice(0, 6)
  // Новинки — последние 4 (сортировка по году)
  const newest = [...movies].sort((a, b) => b.year - a.year).slice(0, 4)

  if (loading) return <div className={styles.loading}>Загрузка...</div>

  return (
    <div>
      {/* ===== HERO ===== */}
      {hero && (
        <section className={styles.hero}>
          {/* Фоновое изображение с градиентом поверх */}
          <div
            className={styles.heroBg}
            style={{ backgroundImage: `url(${hero.backdrop || hero.poster})` }}
          />

          <div className={styles.heroContent}>
            <div className={styles.heroTag}>Рекомендуем</div>
            <h1 className={styles.heroTitle}>{hero.title}</h1>

            <div className={styles.heroMeta}>
              <span className={styles.rating}>★ {hero.rating}</span>
              <span className={styles.sep}>•</span>
              <span>{hero.year}</span>
              <span className={styles.sep}>•</span>
              <span>{hero.genres.join(' · ')}</span>
            </div>

            <p className={styles.heroDesc}>{hero.description}</p>

            <div className={styles.heroBtns}>
              <button
                className={styles.btnPlay}
                onClick={() => navigate(`/movie/${hero.id}`)}
              >
                ▶ Смотреть
              </button>
              {/* stopPropagation не нужен — кнопка сама по себе */}
              <div className={styles.bookmarkWrap}>
                <BookmarkButton movieId={hero.id} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== ПОПУЛЯРНОЕ ===== */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Популярное</h2>
          <button className={styles.seeAll} onClick={() => navigate('/catalog')}>
            Смотреть все →
          </button>
        </div>
        <div className={styles.row}>
          {popular.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* ===== НОВИНКИ ===== */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Новинки</h2>
          <button className={styles.seeAll} onClick={() => navigate('/catalog')}>
            Смотреть все →
          </button>
        </div>
        <div className={styles.row}>
          {newest.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
