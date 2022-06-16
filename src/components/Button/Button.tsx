interface IProps {
 textButton: string,
 onClick?: () => void,
 className?: string
}
const Button = ({ textButton, onClick, className = 'hover:bg-blue-500 border-blue-500' }: IProps) => {
 return (
  <button className={`${className} bg-transparent  text-white font-semibold hover:text-white py-2 px-4 border  hover:border-transparent rounded`} onClick={onClick}>{textButton}</button>
 )
}

export default Button