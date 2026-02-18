// ============================================================
// Profile.jsx — Защищённая страница профиля
//
// Доступна только авторизованным (PrivateRoute в App.jsx).
// Показывает информацию о пользователе и его закладки.
// ============================================================

import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useBookmarks } from '../../context/BookmarksContext'
import { fetchMovies } from '../../data/movies'
import MovieCard from '../../components/MovieCard/MovieCard'
import styles from './Profile.module.css'

function Profile() {
  const { currentUser, logout } = useAuth()
  const { bookmarks } = useBookmarks()
  const [allMovies, setAllMovies] = useState([])

  // Загружаем все фильмы чтобы найти фильмы из закладок
  useEffect(() => {
    fetchMovies().then(setAllMovies)
  }, [])

  // Фильтруем только те фильмы, которые в закладках
  const bookmarkedMovies = allMovies.filter((m) => bookmarks.includes(m.id))

  // Первые буквы имени для аватара
  const initials = currentUser?.username
    ?.split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || '?'

  return (
    <div className={styles.page}>
      <div className={styles.layout}>

        {/* ===== КАРТОЧКА ПОЛЬЗОВАТЕЛЯ ===== */}
        <aside className={styles.card}>
          <div className={styles.avatar}>{initials}</div>
          <div className={styles.name}>{currentUser?.username}</div>
          <div className={styles.email}>{currentUser?.email}</div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statNum}>{bookmarks.length}</div>
              <div className={styles.statLbl}>Закладки</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>{allMovies.length}</div>
              <div className={styles.statLbl}>Доступно</div>
            </div>
          </div>

          <button className={styles.btnLogout} onClick={logout}>
            Выйти из аккаунта
          </button>
        </aside>

        {/* ===== ЗАКЛАДКИ ===== */}
        <div className={styles.main}>
          <h2 className={styles.sectionTitle}>
            Мои закладки
            <span className={styles.count}>{bookmarks.length}</span>
          </h2>

          {bookmarkedMovies.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>🔖</div>
              <p>Вы ещё не добавили ни одного фильма в закладки.</p>
              <p className={styles.hint}>Нажмите на иконку закладки на любой карточке фильма.</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {bookmarkedMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Profile
