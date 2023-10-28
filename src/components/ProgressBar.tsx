interface ProgressBarProps {
  progress: number
}

export const ProgressBar = ({ progress }: ProgressBarProps): JSX.Element => {
  return (
    <div className="h-2 w-full rounded-lg bg-neutral-200 dark:bg-neutral-600 absolute ">
        <div className="h-2 bg-blue-400 transition-all animate-pulse" style={{ width: `${progress}%` }}></div>
    </div>
  )
}
