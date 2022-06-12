import axios from "axios";
import { useEffect, useState } from "react";
import { pokemonAdapters } from "@/adapters";
import { IPokemons, IPokemon } from "@/models";

const useFechtPokemons = () => {
 const [pokemons, setPokemons] = useState<IPokemons>([]);
 const [loading, setLoading] = useState(false)
 const [pokemon, setPokemon] = useState<IPokemon | null>(null);
 const [page, setPage] = useState(0);

 const fetchPokemons = async () => {
  const { data: { results } } = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${page}0&limit=9`);
  const pokemons = await Promise.all(results.length && results.map(async (pokemon: IPokemons) => {
   const { data } = await axios.get(pokemon.url);
   return pokemonAdapters(data);
  }));
  setPokemons(pokemons);
 }


 const fetchDataPokemon = async ({ url, pokemonSelect }: { url: string, pokemonSelect: IPokemon }) => {
  setLoading(true)

  try {
   if (!url && Object.entries(pokemonSelect).length) {
    return setTimeout(() => {
     setPokemon(pokemonSelect)
     setLoading(false)
    }, 900)
   };
   const { data } = await axios.get(url);
   setTimeout(() => {
    setPokemon(pokemonAdapters(data))
    setLoading(false)
   }, 800)
  } catch (error) {
   setPokemon({
    name: "Not! pokemon",
    sprites: "https://i.pinimg.com/originals/b2/08/63/b2086351a03ed48cea85f1e4b468024b.gif"
   })
   setLoading(false)
  }
 }

 useEffect(() => {
  fetchPokemons()
  return () => {
   fetchPokemons()
  }
 }, [page])

 return {
  loading,
  pokemons,
  pokemon,
  page,
  setPage,
  setLoading,
  fetchDataPokemon
 }

}

export default useFechtPokemons