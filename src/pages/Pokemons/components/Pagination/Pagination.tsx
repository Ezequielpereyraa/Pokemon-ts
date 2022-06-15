import Button from "@/components/Button"
import Text from "@/components/Text"
import { useDispatch, useSelector } from "react-redux"
import { decrementPage, incrementPage } from "@/redux/pokemonSlice"


const Pagination = () => {
 const dispatch = useDispatch()
 const page = useSelector(state => state.pokemons.page)

 return (
  <div className="flex justify-center my-5">
   <Button textButton='Prev' onClick={() => dispatch(decrementPage())} />
   <Text className='text-2xl my-2 mx-4' text={page === 0 ? '1' : page + 1} />
   <Button textButton='Next' onClick={() => dispatch(incrementPage())} />
  </div>
 )
}


export default Pagination