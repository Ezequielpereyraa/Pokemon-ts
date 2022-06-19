interface IProps {
 text: string | number,
 className?: string
}
const Text = ({ text, className }: IProps) => {
 return (
  <p className={className}>{text}</p>
 )
}

export default Text