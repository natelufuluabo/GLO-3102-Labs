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

export const getUserTodos = async (userId) => {
  const url = `https://glo3102lab4.herokuapp.com/${userId}/tasks`
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }
    const data = await response.json()
    return data.tasks
  } catch (error) {
    console.error(error.message)
  }
}

export const createNewTodo = async (userId, todoDetail) => {
  const url = `https://glo3102lab4.herokuapp.com/${userId}/tasks`
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: todoDetail }),
    })
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }
  } catch (error) {
    console.error(error.message)
  }
}

export const updateUserTodo = async (userId, todoId, newValue) => {
  const url = `https://glo3102lab4.herokuapp.com/${userId}/tasks/${todoId}`
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newValue }),
    })
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }
  } catch (error) {
    console.error(error.message)
  }
}

export const deleteUserTodo = async (userId, todoId) => {
  const url = `https://glo3102lab4.herokuapp.com/${userId}/tasks/${todoId}`
  try {
    const response = await fetch(url, { method: 'DELETE' })
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }
  } catch (error) {
    console.error(error.message)
  }
}
