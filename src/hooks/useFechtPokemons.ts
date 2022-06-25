import axios from "axios";
import { useEffect } from "react";
import { pokemonAdapters } from "@/adapters";
import { IPokemon, IPokemons } from "@/models";
import { useDispatch, useSelector } from "react-redux";
import { getPokemon, getPokemons, setLoading } from "../redux/pokemonSlice";
import { RootState } from "@/redux/store";

const useFechtPokemons = () => {
  const dispatch = useDispatch()
  const page = useSelector((state: RootState) => state.pokemons.page)
  const fetchPokemons = async () => {
    const URL = `https://pokeapi.co/api/v2/pokemon?offset=${page}&limit=20`
    dispatch(setLoading(true))
    const { data: { results } } = await axios.get(URL);
    const pokemons = await Promise.all(results.length && results.map(async (pokemon: IPokemons) => {
      const { data } = await axios.get(pokemon.url);
      return pokemonAdapters(data);
    }));
    dispatch(getPokemons(pokemons));
    dispatch(setLoading(false))
  }


  const fetchDataPokemon = async ({ url = '', pokemonSelect }: { url?: string, pokemonSelect?: IPokemon }) => {
    dispatch(setLoading(true))
    try {
      if (pokemonSelect) {
        dispatch(getPokemon(pokemonSelect))
        return setTimeout(() => {
          dispatch(setLoading(false))
        }, 1000);
      };
      if (url) {
        const { data } = await axios.get(url);
        dispatch(getPokemon(pokemonAdapters(data)))
        return setTimeout(() => {
          dispatch(setLoading(false))
        }, 1000);
      }
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