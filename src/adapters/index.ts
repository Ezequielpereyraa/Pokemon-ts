export const pokemonAdapters = (data: any) => ({
 name: data.name,
 imageAnimated: data.sprites.versions["generation-v"]["black-white"].animated.front_default,
 imageStatic: data.sprites.front_default,
 weight: data.weight,
 height: data.height,
 baseExperiencia: data.base_experience,
 types: data.types && data.types.map((type: any) => type.type.name),
 species: data.species.name,
 ability: data.abilities && data.abilities.map((ab: any) => ab.ability.name)
})