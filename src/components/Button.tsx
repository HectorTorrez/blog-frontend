interface ButtonProps {
  onClick: () => void
  type: 'button' | 'submit' | 'reset'
  className: string
  children: React.ReactNode
}

export const Button = ({ onClick, type, className, children }: ButtonProps): JSX.Element => {
  return (
    <div className="relative">
        <button
         onClick={onClick}
         type={type}
         className={className}
            >
            {children}
        </button>
    </div>
  )
}
