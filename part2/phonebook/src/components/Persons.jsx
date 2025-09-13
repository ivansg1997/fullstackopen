const Persons = ({persons, filter}) => {

    const personsToShow = persons.filter(person => 
        person.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        personsToShow.map(person => <div key={person.id}>
            <p>{`${person.name} ${person.number}`}</p>
        </div>)
    )
}

export default Persons