import { IPokemons } from '@/models'

export const pokemonAdapters = (data: IPokemons) => ({
 name: data.name,
 sprites: data.sprites.versions["generation-v"]["black-white"].animated.front_default,
 spritesFront: data.sprites.front_default,
 weight: data.weight,
 height: data.height,
 baseExperiencia: data.base_experience,
})