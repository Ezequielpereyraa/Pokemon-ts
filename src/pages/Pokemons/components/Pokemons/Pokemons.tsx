import { IPokemon } from "@/models"
import Text from "@/components/Text"

interface IProps {
 pokemons: IPokemon[],
 selectedPokemon: (name: string) => boolean,
 fetchPokemon: ({ url, pokemonSelect }: { url?: string, pokemonSelect?: IPokemon }) => void
}

const Pokemons = ({ pokemons, fetchPokemon, selectedPokemon }: IProps) => {

 const stylesSelected = (name: string) => {
  if (!selectedPokemon(name)) return {};
  return {
   backgroundColor: 'rgb(3 105 161)',
   fontWeight: 'bold',
   textTransform: 'uppercase',
   letterSpacing: '2px',
  }
 }

 return (
  <div className=' grid grid-cols-3 items-center'>
   {
    !!pokemons.length && pokemons.map((pokemon: IPokemon) => (
     <div onClick={() => fetchPokemon({ pokemonSelect: pokemon })} style={stylesSelected(pokemon.name)} className='m-2 transition ease-in-out delay-150 capitalize font-light cursor-pointer hover:bg-sky-700' key={pokemon.name}>
      <Text className='text-2xl capitalize' text={pokemon.name} />
      <img className='w-20 h-24' src={pokemon.spritesFront} alt={pokemon.name} />
     </div>
    ))
   }
  </div>
 )
}

export default Pokemons