const Filter = ({filter, setFilter}) => {

    const handleChangeFilter = (e) => {
        setFilter(e.target.value)
    }

    return (
        <div>
            Filter shown with: <input value={filter} onChange={handleChangeFilter}/>
            <br/><br/>
        </div>
    )
}

export default Filter