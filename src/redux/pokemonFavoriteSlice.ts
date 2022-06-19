import { createSlice } from "@reduxjs/toolkit";
import { IPokemon } from "@/models";

const getLocalStorge = () => JSON.parse(localStorage.getItem("pokemonFavorite") || "[]");
const addLocalStorage = (pokemonsFavorites: IPokemon[]) => localStorage.setItem("pokemonFavorite", JSON.stringify(pokemonsFavorites));


interface IinitialState {
 pokemonFavorite: IPokemon[]
}
const initialState: IinitialState = {
 pokemonFavorite: getLocalStorge()
}

export const pokemonFavoriteSlice = createSlice({
 name: "pokemonFavorite",
 initialState,
 reducers: {
  addPokemonFavorite: (state, { payload }) => {
   const copyPokemonFavorite = [...state.pokemonFavorite];
   const hasPokemon = copyPokemonFavorite.some(pokemon => pokemon.name.toLowerCase() === payload.name.toLowerCase());
   !hasPokemon && state.pokemonFavorite.push(payload)
   addLocalStorage(state.pokemonFavorite)
  },
  deletedPokemonFavorite: (state, { payload }) => {
   const copyPokemonFavorite = [...state.pokemonFavorite];
   const filterFavorites = copyPokemonFavorite.filter(pokemon => pokemon.name.toLowerCase() !== payload.name.toLowerCase());
   state.pokemonFavorite = filterFavorites;
   addLocalStorage(state.pokemonFavorite)
  }
 }
})

export const { addPokemonFavorite, deletedPokemonFavorite } = pokemonFavoriteSlice.actions

export default pokemonFavoriteSlice.reducer