// ============================================================
// movies.js — mock-данные фильмов
//
// Это временные данные, которые имитируют ответ от API (TMDB).
// Когда подключишь backend — просто замени импорт этого файла
// на вызов fetchMovies() из твоего api-сервиса.
//
// Структура одного объекта повторяет то, что вернёт TMDB API:
//   id, title, year, genres[], rating, description, poster, backdrop
// ============================================================

export const GENRES = [
  'Все', 'Боевик', 'Комедия', 'Драма',
  'Фэнтези', 'Триллер', 'Ужасы', 'Фантастика', 'Аниме'
]

export const movies = [
  {
    id: 1,
    title: 'Дюна: Часть вторая',
    year: 2024,
    genres: ['Фантастика', 'Боевик'],
    rating: 8.5,
    description: 'Пол Атрейдес объединяется с Чани и фрименами, стремясь отомстить заговорщикам, уничтожившим его семью.',
    poster: 'https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg',
    duration: 166,
    age: 16,
  },
  {
    id: 2,
    title: 'Оппенгеймер',
    year: 2023,
    genres: ['Драма', 'Триллер'],
    rating: 8.9,
    description: 'История Дж. Роберта Оппенгеймера и его роли в разработке атомной бомбы в рамках Манхэттенского проекта.',
    poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg',
    duration: 180,
    age: 16,
  },
  {
    id: 3,
    title: 'Интерстеллар',
    year: 2014,
    genres: ['Фантастика', 'Драма'],
    rating: 9.0,
    description: 'Когда засуха, пыльные бури и вымирание растений приводят человечество к продовольственному кризису, группа исследователей проходит через червоточину.',
    poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg',
    duration: 169,
    age: 12,
  },
  {
    id: 4,
    title: 'Начало',
    year: 2010,
    genres: ['Боевик', 'Триллер', 'Фантастика'],
    rating: 8.8,
    description: 'Вор, крадущий корпоративные секреты из снов людей, получает задание внедрить идею в подсознание.',
    poster: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/s2bT29y0ngXxxu2IA8AOzzXTRhd.jpg',
    duration: 148,
    age: 12,
  },
  {
    id: 5,
    title: 'Джокер',
    year: 2019,
    genres: ['Драма', 'Триллер'],
    rating: 8.4,
    description: 'История происхождения самого известного злодея DC — неудачливого комика Артура Флека.',
    poster: 'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/n6bUvigpRFqSwmPp1ZqieMLkXQO.jpg',
    duration: 122,
    age: 18,
  },
  {
    id: 6,
    title: 'Аватар 2',
    year: 2022,
    genres: ['Фантастика', 'Боевик'],
    rating: 7.6,
    description: 'Джейк Салли живёт со своей семьёй на Пандоре. Когда угроза возвращается, он вынужден исследовать регионы Пандоры.',
    poster: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/s16H6tpK2utvwpaWgCQ2aHHZCQu.jpg',
    duration: 192,
    age: 12,
  },
  {
    id: 7,
    title: 'Матрица',
    year: 1999,
    genres: ['Боевик', 'Фантастика'],
    rating: 8.7,
    description: 'Хакер Нео узнаёт, что его мир — симуляция, и присоединяется к борцам с машинами.',
    poster: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg',
    duration: 136,
    age: 16,
  },
  {
    id: 8,
    title: 'Властелин колец: Братство кольца',
    year: 2001,
    genres: ['Фэнтези', 'Боевик'],
    rating: 9.1,
    description: 'Молодой хоббит Фродо вместе с отрядом отправляется уничтожить Кольцо всевластья.',
    poster: 'https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/mfwq2nMBmAL7CUzV0v1RQlLSN1C.jpg',
    duration: 178,
    age: 12,
  },
]

// Функция-заглушка, которая имитирует запрос к API
// Потом заменишь тело на: return axios.get('/api/movies')
export const fetchMovies = () => {
  return Promise.resolve(movies)
}

export const fetchMovieById = (id) => {
  const movie = movies.find(m => m.id === Number(id))
  return Promise.resolve(movie || null)
}
