import anecdotesService from '../services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_ANECDOTES':
      return action.data

    case 'NEW_VOTE': 
      const id = action.data.id
      const anecdoteToUpdate = state.find(anecdoteObj => anecdoteObj.id === id)
      const changedAnecdote = {...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1}
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote )

    case 'NEW_ANECDOTE': 
      return state.concat(action.data)

    default:
      return state
  }
}

// define action creaters
export const initialAnecdotes = () => {
  // return {
  //   type: 'INIT_ANECDOTES',
  //   data: anecdotes
  // }
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const addVoteTo = (id, votedItem) => {
  // return {
  //   type: 'NEW_VOTE',
  //   data: { id }
  // }
  const updatedItem = {...votedItem, votes: votedItem.votes + 1}

  return async dispatch => {
    const response = await anecdotesService.updateVote(id, updatedItem)
    dispatch({
      type: 'NEW_VOTE',
      data: { id }
    })
  }
}

export const addAnecdote = (data) => {
  // const id = getId()

  // return {
  //   type: 'NEW_ANECDOTE',
  //   data,
  // }
  return async dispatch => {
    const response = await anecdotesService.createNew(data)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: response
    })
  }
}

export default reducer
