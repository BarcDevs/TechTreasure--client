export const useLocalStorage = (paramName: string, defaultValue?: any) => {
  const storeValue = (value: any) => localStorage.setItem(
      paramName, JSON.stringify(value) || JSON.stringify(defaultValue)
  )

  const getValue = () =>
      JSON.parse(localStorage.getItem(paramName) || JSON.stringify(defaultValue))

  const removeValue = () => localStorage.removeItem(paramName)

  return { storeValue, getValue, removeValue }
}
