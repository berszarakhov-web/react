// ============================================================
// Navbar.jsx — навигационная шапка
//
// Что умеет:
//   - Показывает кнопки "Войти" / "Профиль" в зависимости от авторизации
//   - Содержит кнопку переключения темы (ThemeToggle)
//   - NavLink автоматически добавляет класс .active для текущей страницы
// ============================================================

import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import styles from './Navbar.module.css'

function Navbar() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.logo}>
        TimeLine<span className={styles.dot}></span>
      </NavLink>

      <ul className={styles.links}>
        <li><NavLink to="/" end className={({ isActive }) => isActive ? styles.active : ''}>Главная</NavLink></li>
        <li><NavLink to="/catalog" className={({ isActive }) => isActive ? styles.active : ''}>Каталог</NavLink></li>
      </ul>

      <div className={styles.right}>
        <ThemeToggle />
        {currentUser ? (
          <>
            <NavLink to="/profile" className={styles.btnGhost}>
              {currentUser.username}
            </NavLink>
            <button onClick={handleLogout} className={styles.btnAccent}>
              Выйти
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={styles.btnGhost}>Войти</NavLink>
            <NavLink to="/register" className={styles.btnAccent}>Регистрация</NavLink>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
