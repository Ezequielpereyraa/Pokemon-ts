import { useDispatch } from "react-redux";
import { deletedPokemonFavorite } from "@/redux/pokemonFavoriteSlice";
import Text from "@/components/Text";
import { IPokemon } from "@/models";
import { useState } from "react";

const Pokemon = ({ pokemon }: { pokemon: IPokemon }) => {
 const dispatch = useDispatch();
 const [onMouse, setOnMouse] = useState(false);

 const onMouseEnter = () => setOnMouse(true);
 const onMouseLeave = () => setOnMouse(false);

 return (
  <div onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter} className='m-2 w-48 h-72 relative transition ease-in-out delay-150 capitalize font-light cursor-pointer hover:border-2 border-sky-100 p-4' key={pokemon.name}>

   {onMouse &&
    <> <Text className='text-xl capitalize text-center font-bold space-x-1' text={pokemon.name} />
     <button className="absolute right-4 top-4 text-red-500 text-2xl" type="button" onClick={() => dispatch(deletedPokemonFavorite(pokemon))}>x</button>
    </>

   }
   <img className="w-32 h-36 mx-auto" src={onMouse ? pokemon.imageAnimated : pokemon.imageStatic} alt={pokemon.name} />
   {onMouse && (
    <div className="flex">
     <div className="flex justify-center m-4">
      {pokemon.weight && <Text className="mr-5" text={`Peso ${pokemon.weight}Kg`} />}
      {pokemon.height && <Text text={`Altura ${pokemon.height}Cm`} />}
     </div>
    </div>
   )
   }
  </div>
 )
}

export default Pokemon