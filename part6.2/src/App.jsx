import AnecdoteList from './components/anecdoteList'
import AnecdoteForm from './components/anecdoteForm'
import Filter from './components/Filter'

const App = () => {
  return (
    <div>
      <Filter />
      <AnecdoteList/>
      <AnecdoteForm />
    </div>
  )
}

export default App