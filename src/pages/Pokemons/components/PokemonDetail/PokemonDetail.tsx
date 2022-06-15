import Text from '@/components/Text'
import Loader from '@/components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../../../components/Button'
import { addPokemonFavorite } from '../../../../redux/pokemonFavoriteSlice'

interface IProps {
 loading: boolean,
}

const PokemonDetail = ({ loading }: IProps) => {
 const pokemon = useSelector(state => state.pokemons.pokemon)
 const dispatch = useDispatch()
 if (loading) {
  return (
   <div className='grid place-content-center'>
    <Loader loading={loading} />
   </div>
  )
 }
 const { name, sprites, weight, height } = pokemon || {}

 return (
  <>
   {
    pokemon && (
     <div className='text-center flex flex-col justify-center'>
      <Text className='text-6xl capitalize' text={name} />
      <img className='w-32 h-32 mx-auto' src={sprites} alt={name} />
      <div className="flex justify-center mt-4">
       {weight && <Text className="mr-5" text={`Peso: ${weight}Kg`} />}
       {height && <Text text={`Altura: ${height}Cm`} />}
      </div>
      <Button onClick={() => dispatch(addPokemonFavorite(pokemon))} textButton='AddFav' />
     </div>
    )
   }
  </>
 )
}

export default PokemonDetail