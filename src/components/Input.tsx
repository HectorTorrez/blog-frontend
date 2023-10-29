interface InputProps {
  id: string
  icon?: React.ReactNode
  label: string
  value?: string | number | readonly string[] | undefined
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type: string,
  inputClassName: string,
  labelClassName: string
}

export const Input = ({ id, icon, label, value, onChange, placeholder, type, inputClassName, labelClassName }: InputProps): JSX.Element => {
  return (
    <label
    htmlFor={id}
    className={labelClassName}
  >
    {label}
    <div className="relative flex items-center">
      <div className="absolute bottom-0 inset-y-0 left-0 flex  items-center pl-3.5 pointer-events-none">
        {icon}
      </div>
      <input
        type={type}
        onChange={onChange}
        value={value}
        id={id}
        name={id}
        className={inputClassName}
        placeholder={placeholder}
      />
    </div>
  </label>
  )
}
// block mb-2 text-sm font-medium text-gray-900 dark:text-white

// bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500