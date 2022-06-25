import Text from '@/components/Text'
import Loader from '@/components/Loader'
import { addPokemonFavorite, deletedPokemonFavorite } from '@/redux/pokemonFavoriteSlice'
import { RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'


const PokemonDetail = () => {
  const pokemon = useSelector((state: RootState) => state.pokemons.pokemon)
  const loading = useSelector((state: RootState) => state.pokemons.loading)
  const pokemonsFavorites = useSelector((state: RootState) => state.pokemonsFavorites.pokemonFavorite);
  const dispatch = useDispatch()

  if (loading && !pokemon) {
    return (
      <div className='min-h-screen grid place-content-center'>
        <Loader loading={loading} />
      </div>
    )
  }
  const { name, imageAnimated: sprites, weight, height, species, ability, types } = pokemon || {}
  const hasFavorite = pokemonsFavorites.some((pokemon) => pokemon.name === name)
  const showBotton = pokemon && pokemon.name === 'Not! pokemon';

  return (
    <>
      {
        pokemon && (
          <div className='text-center flex flex-col justify-center relative'>
            <Text className='text-6xl capitalize' text={name!} />
            <img className='w-32 h-32 mx-auto' src={sprites} alt={name} />
            <div className="flex justify-center m-4">
              {weight && <Text className="mr-5" text={`Peso: ${weight}Kg`} />}
              {height && <Text text={`Altura: ${height}Cm`} />}
            </div>
            <div className="mx-auto">
              <div>
                <div className="flex justiy-start">
                  {species && <Text className='capitalize' text={`Especie: ${species}`} />}
                </div>
                <div className="flex justify-start my-2">
                  <Text text='Ability: ' />
                  {
                    ability?.length && ability.map(specie => <Text className='mx-2 capitalize' text={specie} />)
                  }
                </div>
                <div className="flex justify-start">
                  <Text text='Types:' />
                  {
                    types?.length && types.map(specie => <Text className='mx-2 capitalize' text={specie} />)
                  }
                </div>
              </div>
            </div>
            <div className="absolute top-10 right-4">
              {!showBotton && (
                hasFavorite ? <button className='text-red-500 border-red-500' onClick={() => dispatch(deletedPokemonFavorite(pokemon))}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-20" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </button>
                  :
                  <button className='text-red-500 border-red-500' onClick={() => dispatch(addPokemonFavorite(pokemon))}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
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