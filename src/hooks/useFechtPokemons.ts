import axios from "axios";
import { useEffect } from "react";
import { pokemonAdapters } from "@/adapters";
import { IPokemons, IPokemon } from "@/models";
import { useDispatch } from "react-redux";
import { getPokemon, getPokemons, setLoading } from "../redux/pokemonSlice";
import { useSelectorState } from "./useSelectorState";

const useFechtPokemons = () => {
 const dispatch = useDispatch()
 const page = useSelectorState('page')

 const fetchPokemons = async () => {
  dispatch(setLoading(true))
  const { data: { results } } = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${page}0&limit=9`);
  const pokemons = await Promise.all(results.length && results.map(async (pokemon: IPokemons) => {
   const { data } = await axios.get(pokemon.url);
   return pokemonAdapters(data);
  }));
  dispatch(getPokemons(pokemons));
  setTimeout(() => {
   dispatch(setLoading(false))
  }, 1000);
 }


 const fetchDataPokemon = async ({ url, pokemonSelect }: { url: string, pokemonSelect: IPokemon }) => {
  try {
   if (!url && Object.entries(pokemonSelect).length) {
    dispatch(getPokemon(pokemonSelect))
    return setTimeout(() => {
     dispatch(setLoading(false))
    }, 1000);
   };
   const { data } = await axios.get(url);
   dispatch(getPokemon(pokemonAdapters(data)))
   return setTimeout(() => {
    dispatch(setLoading(false))
   }, 1000);
  } catch (error) {
   dispatch(getPokemon({
    name: "Not! pokemon",
    sprites: "https://i.pinimg.com/originals/b2/08/63/b2086351a03ed48cea85f1e4b468024b.gif"
   }))
   dispatch(setLoading(false))
  }
 }

 useEffect(() => {
  fetchPokemons()
  return () => {
   fetchPokemons()
  }
 }, [page])

 return {
  fetchDataPokemon
 }

}

export default useFechtPokemons