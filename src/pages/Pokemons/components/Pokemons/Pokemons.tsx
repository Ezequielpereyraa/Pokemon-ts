import { IPokemon } from "@/models"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import Pokemon from "./Pokemon"


const Pokemons = () => {
 const pokemons = useSelector((state: RootState) => state.pokemons.pokemons)
 return (
  <div className='grid grid-cols-5 items-center justify-center mx-auto'>
   {
    !!pokemons.length && pokemons.map((pokemon: IPokemon) => (
     <Pokemon key={pokemon.name} pokemon={pokemon} />
    ))
   }
  </div>
 )
}

export default Pokemons