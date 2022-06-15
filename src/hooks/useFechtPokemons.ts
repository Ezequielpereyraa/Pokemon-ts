import axios from "axios";
import { useEffect, useState } from "react";
import { pokemonAdapters } from "@/adapters";
import { IPokemons, IPokemon } from "@/models";
import { useDispatch, useSelector } from "react-redux";
import { getPokemon, getPokemons } from "../redux/pokemonSlice";

const useFechtPokemons = () => {
 const [loading, setLoading] = useState(false)
 const [pokemon, setPokemon] = useState<IPokemon | null>(null);
 const dispatch = useDispatch()
 const page = useSelector(state => state.pokemons.page)

 const fetchPokemons = async () => {
  const { data: { results } } = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${page}0&limit=9`);
  const pokemons = await Promise.all(results.length && results.map(async (pokemon: IPokemons) => {
   const { data } = await axios.get(pokemon.url);
   return pokemonAdapters(data);
  }));
  dispatch(getPokemons(pokemons));
 }


 const fetchDataPokemon = async ({ url, pokemonSelect }: { url: string, pokemonSelect: IPokemon }) => {
  setLoading(true)

  try {
   if (!url && Object.entries(pokemonSelect).length) {
    return setTimeout(() => {
     setPokemon(pokemonSelect)
     dispatch(getPokemon(pokemonSelect))
     setLoading(false)
    }, 900)
   };
   const { data } = await axios.get(url);
   setTimeout(() => {
    dispatch(getPokemon(pokemonAdapters(data)))
    setLoading(false)
   }, 800)
  } catch (error) {
   dispatch(getPokemon({
    name: "Not! pokemon",
    sprites: "https://i.pinimg.com/originals/b2/08/63/b2086351a03ed48cea85f1e4b468024b.gif"
   }))
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
  pokemon,
  setLoading,
  fetchDataPokemon
 }

}

export default useFechtPokemons