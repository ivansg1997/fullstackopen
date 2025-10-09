const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    payload: { id }
  }
}

export const addAnecdote = (content) => {
  return {
    type: 'ADD_VOTE',
    payload: { 
      content,
      votes: 0,
      id: getId()
    }
  }
}

const anecdoteReducer = (state = initialState, action) => {
  switch(action.type){
    case "VOTE": {
      const id = action.payload.id;
      const anecdoteToChange = state.find(anecdote => anecdote.id === id);

      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      
      const newState = state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)

      return newState.sort((a, b) => b.votes - a.votes);
    }
    case "ADD_VOTE": {
      return [...state, action.payload]
    }
    default: 
      return state;
  }
}

export default anecdoteReducer