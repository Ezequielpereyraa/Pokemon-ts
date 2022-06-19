import { NavLink, useLocation } from 'react-router-dom'
import Text from '@/components/Text'
import FormSearch from '../../pages/Pokemons/components/FormSearch'
import useFechtPokemons from '@/hooks/useFechtPokemons'

const Header = () => {
 const { fetchDataPokemon } = useFechtPokemons()
 const location = useLocation();
 const isLocationFavorite = location?.pathname === '/favorites';
 const addClass = isLocationFavorite ? 'justify-between px-20' : 'justify-evenly';
 return (
  <div className={`flex items-center  bg-slate-800 h-14  mb-5 ${addClass}`}>
   <Text className='text-3xl font-bold text-center' text='Pokemons' />
   {
    isLocationFavorite ?
     <NavLink to='/'>Go Home</NavLink>
     : <>
      <FormSearch fetchPokemon={fetchDataPokemon} />
      <NavLink to='/favorites'>Go Favorites</NavLink>
     </>
   }
  </div>
 )
}

export default Header