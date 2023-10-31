interface AlertProps {
  text: string
  type?: string
}
export const Alert = ({ text, type }: AlertProps): JSX.Element => {
  return (
    <section className={`${type === 'error' ? 'bg-red-600  border py-1 min-w-[200px] rounded-[8px] shadow-[0px 0px 5px -3px #111]' : 'bg-green-700 border p-[12px] flex items-center rounded-[8px] shadow-[0px 0px 5px -3px #111]'}`}>
        <p className="text-white text-center font-semibold text-[14px]">{text}</p>
    </section>
  )
}
