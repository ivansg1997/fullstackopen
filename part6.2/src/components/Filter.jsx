import { useDispatch } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const Filter = () => {
    const dispatch = useDispatch();

    const style = {
        marginBottom: 10
    }

    const handleChange = (e) => {
        dispatch(setFilter(e.target.value)); 
    }
    

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter;