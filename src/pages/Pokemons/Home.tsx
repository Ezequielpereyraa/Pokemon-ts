import { FC } from 'react'
import Pokemons from './components/Pokemons';
import PokemonDetail from './components/PokemonDetail';
import Pagination from './components/Pagination';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const Home: FC = () => {
  const pokemonSelect = useSelector((state: RootState) => state.pokemons.pokemon);

  return (
    <>
      <div className={`my-12 grid grid-cols-${pokemonSelect ? '2' : '1'}`}>
        <Pokemons />
        <PokemonDetail />
      </div>
      <Pagination />
    </>
  )
}

export default Home