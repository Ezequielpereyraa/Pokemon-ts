export const pokemonAdapters = (data: any) => ({
 name: data.name,
 imageAnimated: data.sprites.versions["generation-v"]["black-white"].animated.front_default,
 imageStatic: data.sprites.front_default,
 weight: data.weight,
 height: data.height,
 baseExperiencia: data.base_experience,
})