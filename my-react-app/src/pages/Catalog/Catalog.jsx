// ============================================================
// Catalog.jsx — Страница каталога
//
// Логика:
//   1. Загружаем все фильмы через fetchMovies() (useEffect)
//   2. Поиск по названию через searchQuery → useDebounce → фильтрация
//   3. Фильтр по жанру через activeGenre → фильтрация
//   4. Все три стейта хранятся здесь (lifting state up для GenreFilter и SearchBar)
//
// Демонстрирует:
//   ✅ useState (movies, searchQuery, activeGenre)
//   ✅ useEffect (загрузка данных)
//   ✅ props (передача в GenreFilter, SearchBar)
//   ✅ Lifting state up (onSelect, onChange — колбеки вниз, стейт наверху)
//   ✅ Кастомный хук useDebounce
// ============================================================

import { useState, useEffect, useMemo } from 'react'
import { fetchMovies, GENRES } from '../../data/movies'
import MovieCard from '../../components/MovieCard/MovieCard'
import SearchBar from '../../components/SearchBar/SearchBar'
import GenreFilter from '../../components/GenreFilter/GenreFilter'
import { useDebounce } from '../../hooks/useDebounce'
import styles from './Catalog.module.css'

function Catalog() {
  const [movies, setMovies]           = useState([])
  const [loading, setLoading]         = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeGenre, setActiveGenre] = useState('Все')
  const [sortBy, setSortBy]           = useState('rating') // 'rating' | 'year'

  // Задержка поиска: фильтрация запустится только через 300мс после остановки печати
  const debouncedSearch = useDebounce(searchQuery, 300)

  useEffect(() => {
    fetchMovies().then((data) => {
      setMovies(data)
      setLoading(false)
    })
  }, [])

  // useMemo — пересчитываем только когда меняются зависимости
  // Это оптимизация: не пересчитываем при каждом ре-рендере
  const filteredMovies = useMemo(() => {
    let result = movies

    // Фильтр по жанру
    if (activeGenre !== 'Все') {
      result = result.filter((m) => m.genres.includes(activeGenre))
    }

    // Поиск по названию (нечувствительно к регистру)
    if (debouncedSearch.trim()) {
      result = result.filter((m) =>
        m.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    }

    // Сортировка
    return [...result].sort((a, b) =>
      sortBy === 'rating' ? b.rating - a.rating : b.year - a.year
    )
  }, [movies, activeGenre, debouncedSearch, sortBy])

  return (
    <div className={styles.page}>
      <div className={styles.layout}>

        {/* ===== БОКОВОЙ ФИЛЬТР ===== */}
        <aside className={styles.sidebar}>
          <h2 className={styles.filterTitle}>Фильтры</h2>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Поиск</label>
            {/* SearchBar получает значение и колбек — стейт хранится здесь */}
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Жанр</label>
            {/* GenreFilter — lifting state up:
                activeGenre хранится в Catalog, передаётся вниз как prop */}
            <GenreFilter
              genres={GENRES}
              activeGenre={activeGenre}
              onSelect={setActiveGenre}
            />
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Сортировка</label>
            <div className={styles.sortBtns}>
              <button
                className={`${styles.sortBtn} ${sortBy === 'rating' ? styles.sortActive : ''}`}
                onClick={() => setSortBy('rating')}
              >
                По рейтингу
              </button>
              <button
                className={`${styles.sortBtn} ${sortBy === 'year' ? styles.sortActive : ''}`}
                onClick={() => setSortBy('year')}
              >
                По году
              </button>
            </div>
          </div>
        </aside>

        {/* ===== СЕТКА ФИЛЬМОВ ===== */}
        <div>
          {/* Счётчик результатов */}
          <div className={styles.resultsInfo}>
            {loading
              ? 'Загрузка...'
              : `Найдено: ${filteredMovies.length} фильм${filteredMovies.length === 1 ? '' : 'ов'}`
            }
          </div>

          {loading ? (
            <div className={styles.loading}>Загрузка...</div>
          ) : filteredMovies.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>🎬</div>
              <p>Ничего не найдено</p>
              <button onClick={() => { setSearchQuery(''); setActiveGenre('Все') }}>
                Сбросить фильтры
              </button>
            </div>
          ) : (
            <div className={styles.grid}>
              {filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Catalog
