interface IProps {
 textButton: string,
 onClick?: () => void
}
const Button = ({ textButton, onClick }: IProps) => {
 return (
  <button className="g-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={onClick}>{textButton}</button>
 )
}

export default Button