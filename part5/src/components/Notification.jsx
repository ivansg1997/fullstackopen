const Notification = ({message, typeMessage}) => {
    
    if (message === null || typeMessage === null) {
        return null
    }

    return (
        <div className={typeMessage}>
            {message}
        </div>
    )
}

export default Notification