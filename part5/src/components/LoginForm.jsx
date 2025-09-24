import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ setUser, setMessage, setTypeMessage }) => {

    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        
        try {
            const user = await loginService.login({
            username, password,
            })

            window.localStorage.setItem(
            'loggedBlogappUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch /* (exception) */ {
            setMessage('Wrong username or password')
            setTypeMessage('error')
            setTimeout(() => {
            setMessage(null)
            }, 5000)
        }
    };

    if (typeof setUser !== 'function' || typeof setMessage !== 'function' || typeof setTypeMessage !== 'function') {
        console.error('All props for LoginForm must be functions (setUser, setMessage, setTypeMessage).');
    }

    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                        required
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                        required
                    />
                </div>
                <button type="submit">login</button>
            </form>    
            <br/>
        </div>
    )
}

export default LoginForm