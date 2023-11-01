interface AlertProps {
  text: string
  className: string
}
export const Alert = ({ text, className }: AlertProps): JSX.Element => {
  return (
    <section className={className}>
        <p className="text-white text-center font-semibold text-[14px]">{text}</p>
    </section>
  )
}