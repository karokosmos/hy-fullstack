const filterReducer = (state = '', action) => {
  if (action.type === 'SET_FILTER') {
    return action.filter
  }

  return state
}

export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    filter
  }
}

export default filterReducer