import { useRef } from "react";

interface IProps {
 fetchPokemon: ({ url }: { url?: string }) => void;
}

const FormSearch = ({ fetchPokemon }: IProps) => {
 const inputRef = useRef<HTMLInputElement>(null);

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  fetchPokemon({ url: `https://pokeapi.co/api/v2/pokemon/${inputRef.current?.value}` })
  inputRef.current!.value = ''
 }
 return (
  <form className="my-9 ml-14 flex justify-center" onSubmit={(e) => handleSubmit(e)}>
   <input
    className='text-white-800  bg-transparent border-b-2 border-white focus:outline-none focus:border-teal-600'
    type="text"
    name="text"
    placeholder="Search Users..."
    ref={inputRef}
   />
  </form>
 )
}

export default FormSearch