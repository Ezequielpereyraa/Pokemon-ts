import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Pokemons/Home'
import PokemonsFavorites from './pages/PokemonsFavorites'

const App = () => {
  return (
    <section className='bg-gray-900 text-white min-h-screen'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/favorites' element={<PokemonsFavorites />} />
      </Routes>
    </section>
  )
}
export default App