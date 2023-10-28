export const firstLetterUpperCase = (text: string): string => {
  const first = text.split('')[0].toUpperCase()
  const remaining = text.slice(1)
  return first + remaining
}
