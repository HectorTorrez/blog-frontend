export const allFirstLetterUpperCase = (text: string): string => {
  const word = text.split(' ')
  const capitalize = word.map(item => {
    return item.charAt(0).toUpperCase() + item.slice(1)
  })
  return capitalize.join(' ')
}
