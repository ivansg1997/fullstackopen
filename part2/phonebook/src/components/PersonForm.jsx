const PersonForm = ({newName, setNewName, newNumber, setNewNumber, persons, setPersons}) => {

    const handleChangeName = (e) => {
        setNewName(e.target.value)
    };

    const handleChangeNumber = (e) => {
        setNewNumber(e.target.value)
    };

    const handleClick = (e) => {
        e.preventDefault();
        const nameExists = persons.find((person) => person.name === newName);
        
        if(nameExists){
            alert(`${newName} is already added to phonebook`)
        }else{
            setPersons([...persons, {name: newName, number: newNumber, id: persons.length + 1}])
        }
    };

    return (
        <form onSubmit={handleClick}>
            <div>
                name: <input value={newName} onChange={handleChangeName}/>
            </div>
            <div>
                number: <input value={newNumber} onChange={handleChangeNumber}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm