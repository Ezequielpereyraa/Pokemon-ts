import Text from '@/components/Text'
import Loader from '@/components/Loader'
import Button from '@/components/Button'
import { addPokemonFavorite, deletedPokemonFavorite } from '@/redux/pokemonFavoriteSlice'
import { RootState } from '@/redux/store'
import { IPokemon } from '@/models'
import { useDispatch, useSelector } from 'react-redux'
import { useSelectorState } from '@/hooks/useSelectorState'


const PokemonDetail = () => {
  const pokemon = useSelectorState('pokemon')
  const loading = useSelectorState('loading')
  const pokemonsFavorites = useSelector((state: RootState) => state.pokemonsFavorites.pokemonFavorite);
  const dispatch = useDispatch()

  if (loading) {
    return (
      <div className='grid place-content-center'>
        <Loader loading={loading} />
      </div>
    )
  }
  const { name, sprites, weight, height } = pokemon || {}
  const hasFavorite = pokemonsFavorites.some((pokemon: IPokemon) => pokemon.name === name)
  const showBotton = pokemon && pokemon.name === 'Not! pokemon';

  return (
    <>
      {
        pokemon && (
          <div className='text-center flex flex-col justify-center'>
            <Text className='text-6xl capitalize' text={name} />
            <img className='w-32 h-32 mx-auto' src={sprites} alt={name} />
            <div className="flex justify-center m-4">
              {weight && <Text className="mr-5" text={`Peso: ${weight}Kg`} />}
              {height && <Text text={`Altura: ${height}Cm`} />}
            </div>
            <div className="flex justify-center">
              {!showBotton && (
                hasFavorite ? <Button className='text-red-500 border-red-500 hover:bg-red-500' onClick={() => dispatch(deletedPokemonFavorite(pokemon))} textButton='Deleted Favorite' /> :
                  <Button onClick={() => dispatch(addPokemonFavorite(pokemon))} textButton='Added Favorites' />
              )
              }
            </div>
          </div>
        )
      }
    </>
  )
}

export default PokemonDetail