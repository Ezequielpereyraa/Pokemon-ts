import { IPokemons, IPokemon } from "@/models"
import Text from "@/components/Text"
import useFechtPokemons from "@/hooks/useFechtPokemons"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"


const Pokemons = () => {
 const { fetchDataPokemon } = useFechtPokemons()
 const pokemons = useSelector((state: RootState) => state.pokemons.pokemons)
 const pokemon = useSelector((state: RootState) => state.pokemons.pokemon)

 const selectedPokemon = (name: string) => name === pokemon?.name

 const stylesSelected = (name: string): any => {
  if (!selectedPokemon(name)) return {};
  return {
   backgroundColor: 'rgb(3 105 161)',
   fontWeight: 'bold',
   textTransform: 'uppercase',
   letterSpacing: '2px',
  }
 }
 console.log({ pokemons })
 return (
  <div className=' grid grid-cols-3 items-center'>
   {
    !!pokemons.length && pokemons.map((pokemon: IPokemons) => (
     <div onClick={() => fetchDataPokemon({ pokemonSelect: pokemon })} style={stylesSelected(pokemon.name)} className='m-2 transition ease-in-out delay-150 capitalize font-light cursor-pointer hover:bg-sky-700' key={pokemon.name}>
      <Text className='text-2xl capitalize' text={pokemon.name} />
      <img className='w-20 h-24' src={pokemon.spritesFront} alt={pokemon.name} />
     </div>
    ))
   }
  </div>
 )
}

export default Pokemons