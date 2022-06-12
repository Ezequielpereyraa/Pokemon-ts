interface IProps {
 text: string,
 className?: string
}
const Text = ({ text, className }: IProps) => {
 return (
  <p className={className}>{text}</p>
 )
}

export default Text