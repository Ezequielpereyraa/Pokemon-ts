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
  sprites: data.sprites.versions["generation-v"]["black-white"].animated.front_default,
  spritesFront: data.sprites.front_default,
})



const Pokemons: FC = () => {
  const [pokemons, setPokemons] = React.useState([]);
  const [pokemon, setPokemon] = React.useState<Pokemon | null>(null);
  const [loading, setLoading] = React.useState(false)
  const [hover, setHover] = React.useState(false)
  const [page, setPage] = React.useState(1);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchsPokemon = async () => {
    setLoading(true);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${page}0&limit=9`);
    const { results } = await response.json();

    const pokemons = await Promise.all(results.map(async (pokemon: Pokemons) => {
      const response = await fetch(pokemon.url);
      const data = await response.json();
      console.log({ data })
      return parseDataPokemon(data);
    }));
    setPokemons(pokemons);
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

  const mouseEnter = (e: EventTarget, name: string) => {
    const target = e.target as HTMLElement;
    const isEqual = target.innerHTML.trim().toLowerCase() === name.trim().toLowerCase()
    setHover(isEqual)
    setTimeout(() => {
      setHover(false)
    }, 800);
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center translate-y-4">Pokemons</h1>
      <form className="my-9 ml-14 flex justify-center" onSubmit={(e) => handleSubmit(e)}>
        <input
          className='text-white-800  bg-transparent border-b-2 border-white focus:outline-none focus:border-teal-600'
          type="text"
          name="text"
          placeholder="Search Users..."
          ref={inputRef}
        />
      </form>

      <div className={`w-3/3 mx-auto grid grid-cols-${pokemon ? '2' : '1'} justify-center`}>
        <div className=' grid grid-cols-3 items-center'>
          {
            !!pokemons.length && pokemons.map((pokemon: Pokemons) => (
              <div onClick={() => fetchDataPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)} style={stylesSelected(pokemon.name)} className='m-2 transition ease-in-out delay-150 capitalize font-light cursor-pointer hover:bg-sky-700' key={pokemon.name}>
                <h1 className='text-2xl capitalize'>{pokemon.name} </h1>
                <img className='w-20 h-24' src={pokemon.spritesFront} alt={pokemon.name} />
              </div>
            ))
          }
        </div>
        {loading && <svg role="status" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>}
        {
          !loading && pokemon && (
            <div className='text-center flex flex-col justify-center'>
              <h1 className='text-6xl capitalize'>{pokemon.name} </h1>
              <img className='w-32 h-32 mx-auto' src={pokemon.sprites} alt={pokemon.name} />
            </div>
          )
        }
      </div >
      <div className="flex justify-center">
        <button onClick={() => setPage(page - 1)}>Prev</button>
        <b className='mx-6'>{page}</b>
        <button onClick={() => {
          setPage(page + 1)
          setPokemon(null)
        }}>Next</button>
      </div>
    </>
  )
}

export default Pokemons