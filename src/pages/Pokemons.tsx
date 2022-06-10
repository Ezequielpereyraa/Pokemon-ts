import React, { FC, useRef } from 'react'

/*
 # Mostrar listado de pokemon, solamente con nombre
 #Al Clickear uno, mostar su informacion
*/
interface Pokemons {
  name: string,
  url: string
}
interface Pokemon {
  sprites: string,
  name: string,
}

const parseDataPokemon = (data: Pokemon) => ({
  name: data.name,
  sprites: data.sprites.versions["generation-v"]["black-white"].animated.front_default
})



const Pokemons: FC = () => {
  const [pokemons, setPokemons] = React.useState([]);
  const [pokemon, setPokemon] = React.useState<Pokemon | null>(null);
  const [loading, setLoading] = React.useState(false)
  const [page, setPage] = React.useState(1);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchsPokemon = async () => {
    setLoading(true);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${page}0&limit=20`);
    const data = await response.json();
    setPokemons(data.results);
    setLoading(false);
  }

  React.useEffect(() => {
    fetchsPokemon()
  }, [page])

  const fetchDataPokemon = async (url: string) => {
    setLoading(true)
    try {
      const fetchPokemon = await fetch(url);
      const parsedPokemon = await fetchPokemon.json();
      setTimeout(() => {
        setPokemon(parseDataPokemon(parsedPokemon))
        setLoading(false)
      }, 500)
    } catch (error) {
      setPokemon({
        name: "Not! pokemon",
        sprites: "https://i.pinimg.com/originals/b2/08/63/b2086351a03ed48cea85f1e4b468024b.gif"
      })
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    fetchDataPokemon(`https://pokeapi.co/api/v2/pokemon/${inputRef.current?.value}`)
    inputRef.current.value = ''
  }
  const selectedPokemon = (name: string) => name === pokemon?.name

  const stylesSelected = (name: string) => {
    if (!selectedPokemon(name)) return {};
    return {
      backgroundColor: 'rgb(3 105 161)',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '2px',
    }

  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center translate-y-4">Pokemons</h1>
      <form className="my-5 ml-14" onSubmit={(e) => handleSubmit(e)}>
        <input
          className='text-white-800  bg-transparent border-b-2 border-white focus:outline-none focus:border-teal-600'
          type="text"
          name="text"
          placeholder="Search Users..."
          ref={inputRef}
        />
      </form>
      <div className='container mx-auto grid gap-4 grid-cols-[200px_minmax(900px,_1fr)_100px] items-center'>
        <ul className='mt-5'>
          {
            !!pokemons.length && pokemons.map((pokemon: Pokemons) => (
              <li style={stylesSelected(pokemon.name)} className='w-32 m-2 transition ease-in-out delay-150 capitalize font-light cursor-pointer hover:bg-sky-700  ' onClick={() => fetchDataPokemon(pokemon.url)} key={pokemon.name}>{pokemon.name}</li>
            ))
          }
        </ul >
        {loading && <svg role="status" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>}
        {
          !loading && pokemon && (
            <div className='text-center w-64 flex flex-col justify-center'>
              <h1 className='text-6xl capitalize'>{pokemon.name} </h1>
              <img className='w-32 h-32' src={pokemon.sprites} alt={pokemon.name} />
            </div>
          )
        }
      </div >
      <button className='ml-20 mt-5' onClick={() => setPage(page - 1)}>Prev</button>
      <b className='mx-6'>{page}</b>
      <button onClick={() => {
        setPage(page + 1)
        setPokemon(null)
      }}>Next</button>
    </>
  )
}

export default Pokemons