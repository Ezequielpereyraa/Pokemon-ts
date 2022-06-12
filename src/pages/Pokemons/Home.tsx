import { FC } from 'react'
import Text from '@/components/Text';
import Loader from '@/components/Loader';
import useFechtPokemons from '@/hooks/useFechtPokemons';
import Pokemons from './components/Pokemons';
import PokemonDetail from './components/PokemonDetail';
import FormSearch from './components/FormSearch';
import Pagination from './components/Pagination';

const Home: FC = () => {
  const { page, loading, pokemon, pokemons, setPage, fetchDataPokemon } = useFechtPokemons()
  const selectedPokemon = (name: string) => name === pokemon?.name
  return (
    <>
      <Text className="text-3xl font-bold text-center translate-y-4" text='Pokemons' />
      <FormSearch fetchPokemon={fetchDataPokemon} />
      <div className={` grid grid-cols-${pokemon && Object.entries(pokemon).length ? '2' : '1'} justify-center`}>
        <Pokemons pokemons={pokemons} selectedPokemon={selectedPokemon} fetchPokemon={fetchDataPokemon} />
        <>
          <Loader />
          <PokemonDetail pokemon={pokemon} loading={loading} />
        </>
      </div >
      <Pagination page={page} setPage={setPage} />
    </>
  )
}

export default Home