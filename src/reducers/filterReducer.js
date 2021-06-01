const filterReducer = (state = 'ALL', action) => {
  // console.log('filter state now: ', state)
  // console.log('action', action)

  switch(action.type) {
    case 'CHANGE_FILTER':
      return action.data.filter
    default:
      return state
  }
}

export const filterChange = (filterText) => {
  return {
    type: 'CHANGE_FILTER',
    data: {
      filter: filterText
    }
  }
}

export default filterReducer