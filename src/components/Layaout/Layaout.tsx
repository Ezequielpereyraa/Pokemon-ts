import Pagination from '@/pages/Pokemons/components/Pagination'
import { Outlet } from 'react-router-dom'
import Header from '../Header'

const Layaout = () => (
 <div>
  <Header />
  <section className='bg-gray-900 text-white min-h-screen'>
   <Outlet />
   <Pagination />
  </section>
 </div>
)


export default Layaout