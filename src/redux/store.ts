import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from '@/redux/pokemonSlice';
import pokemonFavoriteReducer from "@/redux/pokemonFavoriteSlice";

export const store = configureStore({
 reducer: {
  pokemons: pokemonReducer,
  pokemonsFavorites: pokemonFavoriteReducer
 }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;