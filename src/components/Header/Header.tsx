import { NavLink, useLocation } from 'react-router-dom'
import Text from '@/components/Text'
import FormSearch from '../../pages/Pokemons/components/FormSearch'
import useFechtPokemons from '@/hooks/useFechtPokemons'

const Header = () => {
 const { fetchDataPokemon } = useFechtPokemons()
 const location = useLocation();
 const isLocationFavorite = location?.pathname === '/favorites';

 return (
  <div className="flex items-center justify-evenly bg-slate-800 h-14 mb-5">
   {
    isLocationFavorite ? <NavLink to='/'>Go Home</NavLink> : <NavLink to='/favorites'>Go Favorites</NavLink>
   }
   <Text className="text-3xl font-bold text-center " text='Pokemons' />
   <FormSearch fetchPokemon={fetchDataPokemon} />
  </div>
 )
}

export default Header