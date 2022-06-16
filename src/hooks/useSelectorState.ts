import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"

export const useSelectorState = (selector: string) => {
 return useSelector((state: RootState) => state.pokemons[selector])
}