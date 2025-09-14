const Persons = ({persons, filter, deletePerson}) => {

    const personsToShow = persons.filter(person => 
        person.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        personsToShow.map(person => <div key={person.id} style={{display: "flex", alignItems: "center", gap: 5}}>
            <p>{`${person.name} ${person.number}`}</p>
            <button style={{height: 'fit-content'}} onClick={(e) => {
                e.preventDefault();
                if(window.confirm(`delte ${person.name} ?`)){
                    deletePerson(person.id);
                }
            }}>delete</button>
        </div>)
    )
}

export default Persons