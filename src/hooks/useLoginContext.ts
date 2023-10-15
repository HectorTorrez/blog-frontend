import { useContext } from 'react'
export const useLoginContext = (context: any): any => {
  const contextValue = useContext(context)

  if (contextValue === undefined) {
    throw new Error('useLoginContext must be used within a LoginContextProvider')
  }
  return contextValue
}
