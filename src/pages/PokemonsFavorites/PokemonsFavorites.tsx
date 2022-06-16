import { useDispatch, useSelector } from "react-redux";
import Text from "@/components/Text";
import { IPokemon } from "@/models";
import { deletedPokemonFavorite } from "@/redux/pokemonFavoriteSlice";
import { RootState } from "@/redux/store";

const PokemonsFavorites = () => {
  const pokemonsFav = useSelector((state: RootState) => state.pokemonsFavorites.pokemonFavorite);
  const dispatch = useDispatch();

  if (!pokemonsFav.length) {
    return (
      <div className='grid place-content-center'>
        <Text className='text-center' text='No tienes pokemons favoritos' />
      </div>
    )
  }

  return (
    <div className="flex gap-5">
      {
        !!pokemonsFav.length && pokemonsFav.map((pokemon: IPokemon) => (
          <div className='m-2 relative transition ease-in-out delay-150 capitalize font-light cursor-pointer hover:bg-sky-700' key={pokemon.name}>
            <button className="absolute right-0 text-red-500 text-2xl" type="button" onClick={() => dispatch(deletedPokemonFavorite(pokemon))}>x</button>
            <Text className='text-2xl capitalize' text={pokemon.name} />
            <img className="w-32 h-36" src={pokemon.spritesFront} alt={pokemon.name} />
          </div>
        ))
      }</div>
  )
}

export default PokemonsFavorites