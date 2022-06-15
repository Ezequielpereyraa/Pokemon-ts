import { FC, useEffect } from 'react'
import Text from '@/components/Text';
import Loader from '@/components/Loader';
import useFechtPokemons from '@/hooks/useFechtPokemons';
import Pokemons from './components/Pokemons';
import PokemonDetail from './components/PokemonDetail';
import FormSearch from './components/FormSearch';
import Pagination from './components/Pagination';
import PokemonsFavorites from '../PokemonsFavorites';

const Home: FC = () => {
  const { loading, fetchDataPokemon } = useFechtPokemons()

  return (
    <>
      <Text className="text-3xl font-bold text-center translate-y-4" text='Pokemons' />
      <FormSearch fetchPokemon={fetchDataPokemon} />
      <div className='grid grid-cols-2'>
        <Pokemons fetchPokemon={fetchDataPokemon} />
        <Loader />
        <PokemonDetail loading={loading} />
        <PokemonsFavorites />
      </div>
      <Pagination />
    </>
  )
}

export default Home