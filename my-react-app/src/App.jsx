import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'

// Страницы
import Home from './pages/Home/Home'
import Catalog from './pages/Catalog/Catalog'
import Movie from './pages/Movie/Movie'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Profile from './pages/Profile/Profile'

// App — это «скелет» приложения:
// Navbar + <Routes> + Footer
// Navbar и Footer рендерятся на всех страницах
function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          {/* Публичные маршруты — доступны всем */}
          <Route path="/"           element={<Home />} />
          <Route path="/catalog"    element={<Catalog />} />
          <Route path="/movie/:id"  element={<Movie />} />
          <Route path="/login"      element={<Login />} />
          <Route path="/register"   element={<Register />} />

          {/* Защищённый маршрут — только для авторизованных */}
          {/* PrivateRoute проверяет AuthContext и редиректит на /login если не вошёл */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App
