// BookmarkButton.jsx — кнопка добавления в закладки
//
// Использует useBookmarks() для toggle и проверки состояния.
// Если пользователь не авторизован — редиректит на /login.

import { useNavigate } from 'react-router-dom'
import { useBookmarks } from '../../context/BookmarksContext'
import { useAuth } from '../../context/AuthContext'
import styles from './BookmarkButton.module.css'

function BookmarkButton({ movieId }) {
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const saved = isBookmarked(movieId)

  const handleClick = (e) => {
    e.stopPropagation()

    // Если не авторизован — отправляем логиниться
    if (!currentUser) {
      navigate('/login')
      return
    }

    toggleBookmark(movieId)
  }

  return (
    <button
      className={`${styles.btn} ${saved ? styles.saved : ''}`}
      onClick={handleClick}
      aria-label={saved ? 'Удалить из закладок' : 'Добавить в закладки'}
      title={saved ? 'Удалить из закладок' : 'Добавить в закладки'}
    >
      {saved ? '🔖' : '🏷️'}
    </button>
  )
}

export default BookmarkButton
