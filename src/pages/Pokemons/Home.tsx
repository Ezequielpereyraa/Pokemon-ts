import { FC } from 'react'
import Pagination from './components/Pagination';
import Pokemons from './components/Pokemons';

const Home: FC = () => {
  return (
    <div className='p-5'>
      <Pokemons />
      <Pagination />
    </div>
  )
}
export default Home