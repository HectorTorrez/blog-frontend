interface ButtonProps {
  onClick?: () => void
  type: 'button' | 'submit' | 'reset'
  className: string
  children: React.ReactNode
  dataCy?: string
}

export const Button = ({ onClick, type, className, children, dataCy }: ButtonProps): JSX.Element => {
  return (
    <div className="relative">
        <button
         data-cy={dataCy}
         onClick={onClick}
         type={type}
         className={className}
            >
            {children}
        </button>
    </div>
  )
}
