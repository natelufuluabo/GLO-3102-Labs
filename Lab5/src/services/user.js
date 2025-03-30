export const createUser = async () => {
  const url = 'https://glo3102lab4.herokuapp.com/users'
  try {
    const response = await fetch(url, { method: 'POST' })
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error.message)
  }
}

export const getUserTodos = async (id) => {
  const url = `https://glo3102lab4.herokuapp.com/${id}/tasks`
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error.message)
    return false
  }
}
