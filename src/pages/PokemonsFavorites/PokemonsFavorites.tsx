import { useSelector } from "react-redux";
import Text from "../../components/Text";
import { IPokemon } from "../../models";

const PokemonsFavorites = () => {
 const pokemonsFav = useSelector((state) => state.pokemonsFavorites.pokemonFavorite);
 return (
  <div>{
   !!pokemonsFav.length && pokemonsFav.map((pokemon: IPokemon) => (
    <div className='m-2 transition ease-in-out delay-150 capitalize font-light cursor-pointer hover:bg-sky-700' key={pokemon.name}>
     <Text className='text-2xl capitalize' text={pokemon.name} />
     <img className='w-20 h-24' src={pokemon.spritesFront} alt={pokemon.name} />
    </div>
   ))
  }</div>
 )
}

export default PokemonsFavorites