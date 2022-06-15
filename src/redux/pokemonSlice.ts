import { createSlice } from "@reduxjs/toolkit"
import { IPokemon, IPokemons } from "../models"

export interface IinitialState {
 pokemon: IPokemon | null,
 pokemons: IPokemons[],
 page: number,
}

const initialState: IinitialState = {
 pokemon: null,
 pokemons: [],
 page: 0
}

export const pokemonSlice = createSlice({
 name: "pokemons",
 initialState,
 reducers: {
  getPokemons: (state, { payload }) => {
   state.pokemons = payload
  }
  ,
  getPokemon: (state, { payload }) => {
   state.pokemon = payload
  },
  incrementPage: (state) => {
   state.page++
  },
  decrementPage: (state) => {
   state.page = Math.max(0, state.page - 1)
  }
 }
})

export const { getPokemons, getPokemon, incrementPage, decrementPage } = pokemonSlice.actions

export default pokemonSlice.reducer