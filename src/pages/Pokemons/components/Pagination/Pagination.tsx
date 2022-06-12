import Button from "@/components/Button"
import Text from "@/components/Text"

interface IProps {
 page: number
 setPage: Function
}

const Pagination = ({ setPage, page }: IProps) => (
 <div className="flex justify-center">
  <Button textButton='Prev' onClick={() => setPage(page - 1)} />
  <Text className='text-2xl my-2 mx-4' text={page === 0 ? '1' : page + 1} />
  <Button textButton='Next' onClick={() => setPage(page + 1)} />
 </div>
)


export default Pagination