import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

// ============================================================
// BookmarksContext — закладки/избранное
//
// Закладки привязаны к конкретному пользователю:
// ключ в LocalStorage = 'timeline_bookmarks_<email>'
// Это значит у каждого юзера свой список закладок.
//
// Что умеет:
//   bookmarks           — массив id фильмов в закладках
//   addBookmark(id)     — добавить фильм
//   removeBookmark(id)  — удалить фильм
//   isBookmarked(id)    — проверить, есть ли фильм в закладках
//   toggleBookmark(id)  — переключить (добавить/удалить)
// ============================================================

const BookmarksContext = createContext(null)

export function BookmarksProvider({ children }) {
  const { currentUser } = useAuth()
  const [bookmarks, setBookmarks] = useState([])

  // Ключ зависит от email текущего юзера
  const storageKey = currentUser
    ? `timeline_bookmarks_${currentUser.email}`
    : null

  // Загружаем закладки при смене пользователя (или при логине/логауте)
  useEffect(() => {
    if (storageKey) {
      const saved = JSON.parse(localStorage.getItem(storageKey) || '[]')
      setBookmarks(saved)
    } else {
      // Если пользователь вышел — очищаем закладки в стейте
      setBookmarks([])
    }
  }, [storageKey])

  // Сохраняем в LocalStorage при каждом изменении закладок
  useEffect(() => {
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(bookmarks))
    }
  }, [bookmarks, storageKey])

  const addBookmark = (movieId) => {
    setBookmarks(prev => [...prev, movieId])
  }

  const removeBookmark = (movieId) => {
    setBookmarks(prev => prev.filter(id => id !== movieId))
  }

  const isBookmarked = (movieId) => bookmarks.includes(movieId)

  // toggleBookmark — самый удобный метод для кнопки-иконки
  const toggleBookmark = (movieId) => {
    isBookmarked(movieId) ? removeBookmark(movieId) : addBookmark(movieId)
  }

  return (
    <BookmarksContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked, toggleBookmark }}>
      {children}
    </BookmarksContext.Provider>
  )
}

export const useBookmarks = () => useContext(BookmarksContext)
