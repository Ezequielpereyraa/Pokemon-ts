import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Layaout from './components/Layaout'
import Pagination from './pages/Pokemons/components/Pagination'
import PokemonDetail from './pages/Pokemons/components/PokemonDetail'
import Home from './pages/Pokemons/Home'
import PokemonsFavorites from './pages/PokemonsFavorites'

const App = () => {
  return (
    <section className='bg-gray-900 text-white min-h-screen'>
      <Header />
      <Routes>
        <Route path='/' element={<Layaout />} />
        <Route index element={<Home />} />
        <Route path='pokemon/:pokemonId' element={<PokemonDetail />} />
        <Route path='/favorites' element={<PokemonsFavorites />} />
        <Route path='*' element={<div>404 - Not Found</div>} />
      </Routes>
    </section>
  )
}
export default App