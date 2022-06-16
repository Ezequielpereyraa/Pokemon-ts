import { createSlice } from "@reduxjs/toolkit"
import { IPokemon, IPokemons } from "../models"

export interface IinitialState {
 pokemon: IPokemon | null,
 pokemons: IPokemons[],
 page: number,
 loading: boolean,
}

const initialState: IinitialState = {
 pokemon: null,
 pokemons: [],
 page: 0,
 loading: false
}

export const pokemonSlice = createSlice({
 name: "pokemons",
 initialState,
 reducers: {
  getPokemons: (state, { payload }) => {
   state.loading = true
   state.pokemons = payload
  },
  getPokemon: (state, { payload }) => {
   state.loading = true
   state.pokemon = payload
  },
  incrementPage: (state) => {
   state.page++
  },
  decrementPage: (state) => {
   state.page = Math.max(0, state.page - 1)
  },
  setLoading: (state, { payload }) => {
   state.loading = payload
  }
 }
})

export const { getPokemons, getPokemon, incrementPage, decrementPage, setLoading } = pokemonSlice.actions

export default pokemonSlice.reducer