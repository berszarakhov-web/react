import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { BookmarksProvider } from './context/BookmarksContext'
import { ThemeProvider } from './context/ThemeContext'
import './index.css'

// Оборачиваем всё в три провайдера:
// ThemeProvider  → тёмная/светлая тема (глобально через CSS-переменные)
// AuthProvider   → авторизация (хранится в LocalStorage)
// BookmarksProvider → закладки (хранятся в LocalStorage)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <BookmarksProvider>
            <App />
          </BookmarksProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
