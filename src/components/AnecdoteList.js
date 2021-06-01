import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVoteTo } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  // console.log(anecdotes)
  const anecdotesForRender = useSelector(state => {
    if (state.filter === 'ALL') return anecdotes.sort((a, b)=> b.votes - a.votes)

    const re = new RegExp(state.filter, 'ig');
    const filteredAnecdotes = anecdotes.filter((item) => {
      return re.test(item.content)
    })
    return filteredAnecdotes.sort((a, b)=> b.votes - a.votes)
  })

  const dispatch = useDispatch()

  // vote action handler
  const vote = (id) => {
    const votedItem = anecdotes.find((item) => {
      return item.id === id
    })

    // send action to store
    dispatch(addVoteTo(id, votedItem))

    dispatch(setNotification(`You voted ${votedItem.content}`, 5000))
  }

  return (
    <div>
      {anecdotesForRender.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList