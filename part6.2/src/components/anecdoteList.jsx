
import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {

    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    const filteredAnecdotes = anecdotes.filter(anecdote => 
        anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    const dispatch = useDispatch()

    return (
        <div>
            <h2>Anecdotes</h2>
            {filteredAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => dispatch(voteAnecdote(anecdote.id))}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList