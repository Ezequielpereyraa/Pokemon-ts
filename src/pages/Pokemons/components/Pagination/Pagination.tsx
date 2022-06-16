import Button from "@/components/Button"
import Text from "@/components/Text"
import { useDispatch } from "react-redux"
import { decrementPage, incrementPage } from "@/redux/pokemonSlice"
import { useSelectorState } from "@/hooks/useSelectorState"


const Pagination = () => {
 const dispatch = useDispatch()
 const page = useSelectorState('page')

 return (
  <div className="flex justify-center my-5">
   <Button textButton='Prev' onClick={() => dispatch(decrementPage())} />
   <Text className='text-2xl my-2 mx-4' text={page === 0 ? '1' : page + 1} />
   <Button textButton='Next' onClick={() => dispatch(incrementPage())} />
  </div>
 )
}


export default Pagination