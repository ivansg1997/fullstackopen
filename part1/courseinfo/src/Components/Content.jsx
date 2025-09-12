
import Part from "./Part"

const Content = ({parts}) => {
    return (
        <div>
            {parts.map((item, idx) => <Part key={idx} part={item.name} exercises={item.exercises} />)}
        </div>
    );
};

export default Content