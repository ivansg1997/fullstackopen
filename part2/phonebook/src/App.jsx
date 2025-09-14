import Filter from './components/Filter';
import PersonForm from './components/personForm';
import Persons from './components/Persons';
import { useState, useEffect } from 'react';
import personService  from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

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
        })
        .catch(error => {
            console.log('Error al añadir:', error);
        });
  };

  const deletePerson = (id) => {
    personService
      .Delete(id)
      .then(response => {
            if(response.id === id){
              setPersons(persons.filter(person => person.id !== id));
            }
        })
        .catch(error => {
            console.log('Error al eliminar:', error);
        });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter filter={filter} setFilter={setFilter}/>
      
      <h3>Add a new</h3>

      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} persons={persons} addPerson={addPerson}/>

      <h2>Numbers</h2>
      
      <Persons persons={persons} filter={filter} deletePerson={deletePerson}/>

    </div>
  )
}

export default App