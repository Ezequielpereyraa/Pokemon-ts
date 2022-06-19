export interface IPokemons {
 imageStatic: string | undefined
 name: string,
 url: string
}

export interface IPokemon {
 imageAnimated: string,
 imageStatic: string,
 name: string,
 weight: number,
 height: number,
 baseExperiencia: number
}