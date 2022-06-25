import { Link } from "react-router-dom"
import { useState } from "react"
import Text from "@/components/Text"
import useFechtPokemons from "@/hooks/useFechtPokemons";
import { IPokemon } from "@/models";

const Pokemon = ({ pokemon }: { pokemon: IPokemon }) => {
 const { fetchDataPokemon } = useFechtPokemons()
 const [onMouse, setOnMouse] = useState(false);

 const onMouseEnter = () => setOnMouse(true);
 const onMouseLeave = () => setOnMouse(false);


 return (
  <Link onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} to={`/pokemon/${pokemon.name}`} onClick={() => fetchDataPokemon({ pokemonSelect: pokemon })} className='w-48 m-2 transition ease-in-out delay-150 capitalize font-light cursor-pointer hover:bg-sky-700' key={pokemon.name}>
   <Text className='text-xl capitalize text-center' text={pokemon.name} />
   <img className="w-32 h-36 mx-auto" src={onMouse ? pokemon.imageAnimated : pokemon.imageStatic} alt={pokemon.name} />
  </Link>
 )
}

export default Pokemon