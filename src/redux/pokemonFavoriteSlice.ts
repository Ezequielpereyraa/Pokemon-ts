import { createSlice } from "@reduxjs/toolkit";
import { IPokemons } from "@/models";
interface IinitialState {
 pokemonFavorite: IPokemons
}
const initialState: IinitialState = {
 pokemonFavorite: []
}

export const pokemonFavoriteSlice = createSlice({
 name: "pokemonFavorite",
 initialState,
 reducers: {
  addPokemonFavorite: (state, { payload }) => {
   const copyPokemonFavorite = [...state.pokemonFavorite];
   const hasPokemon = copyPokemonFavorite.some(pokemon => pokemon.name.toLowerCase() === payload.name.toLowerCase());
   !hasPokemon && state.pokemonFavorite.push(payload)
  },
  deletedPokemonFavorite: (state, { payload }) => {
   const copyPokemonFavorite = [...state.pokemonFavorite];
   const filterFavorites = copyPokemonFavorite.filter(pokemon => pokemon.name.toLowerCase() !== payload.name.toLowerCase());
   state.pokemonFavorite = filterFavorites;
  }
 }
})

export const { addPokemonFavorite, deletedPokemonFavorite } = pokemonFavoriteSlice.actions

export default pokemonFavoriteSlice.reducer