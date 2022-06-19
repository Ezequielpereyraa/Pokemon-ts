import Text from "@/components/Text";
import { IPokemon } from "@/models";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Pokemon from "./components/Pokemon";

const PokemonsFavorites = () => {
  const pokemonsFav = useSelector((state: RootState) => state.pokemonsFavorites.pokemonFavorite);

  if (!pokemonsFav.length) {
    return (
      <div className='grid place-content-center'>
        <Text className='text-center text-3xl text-red-500' text='You have no favorite pokemon' />
      </div>
    )
  }

  return (
    <div className="flex gap-5">
      {
        !!pokemonsFav.length && pokemonsFav.map((pokemon: IPokemon) => <Pokemon key={pokemon.name} pokemon={pokemon} />)
      }</div>
  )
}

export default PokemonsFavorites