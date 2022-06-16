import { FC } from 'react'
import Pokemons from './components/Pokemons';
import PokemonDetail from './components/PokemonDetail';
import Pagination from './components/Pagination';

const Home: FC = () => {

  return (
    <>
      <div className='grid grid-cols-2'>
        <Pokemons />
        <PokemonDetail />
      </div>
      <Pagination />
    </>
  )
}

export default Home