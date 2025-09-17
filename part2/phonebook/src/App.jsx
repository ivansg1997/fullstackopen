import Filter from './components/Filter';
import PersonForm from './components/personForm';
import Persons from './components/Persons';
import { useState, useEffect } from 'react';
import personService  from './services/persons'
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [typeMessage, setTypeMessage] = useState(null);

  useEffect(() => {
    personService
      .GetAll()
      .then(allPersons => {
        setPersons(allPersons);
      })
      .catch(error => {
          console.log('Error: ', error)
      });
  }, []);

  const addPerson = () => {
    const payload = {name: newName, number: newNumber};

    personService
      .Create(payload)
      .then(response => {
            setPersons([...persons, response]);
            setMessage( `Added ${response.name}`);
            setTypeMessage("success");
            setNewName("");
            setNewNumber("");
            setTimeout(() => {
              setMessage(null)
            }, 5000)
        })
        .catch(error => {
            setMessage(error.response.data.error);
            setTypeMessage("error");
            setTimeout(() => {
              setMessage(null)
            }, 5000)
        });
  };

  const deletePerson = (id) => {
    personService
      .Delete(id)
      .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
            console.log('Error al eliminar:', error);
        });
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} typeMessage={typeMessage}/>
      <Filter filter={filter} setFilter={setFilter}/>
      
      <h3>Add a new</h3>

      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} persons={persons} addPerson={addPerson}/>

      <h2>Numbers</h2>
      
      <Persons persons={persons} filter={filter} deletePerson={deletePerson}/>

    </div>
  )
}

export default App