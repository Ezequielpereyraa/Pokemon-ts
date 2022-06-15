import { createSlice } from "@reduxjs/toolkit";

export const pokemonFavoriteSlice = createSlice({
 name: "pokemonFavorite",
 initialState: {
  pokemonFavorite: [],
 },
 reducers: {
  addPokemonFavorite: (state, { payload }) => {
   const copyPokemonFavorite = [...state.pokemonFavorite];
   const hasPokemon = copyPokemonFavorite.some(pokemon => pokemon.name.toLowerCase() === payload.name.toLowerCase());
   !hasPokemon && state.pokemonFavorite.push(payload)
  }
 }
})

export const { addPokemonFavorite } = pokemonFavoriteSlice.actions

export default pokemonFavoriteSlice.reducer