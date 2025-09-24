import { useState, useEffect } from 'react'
import loginService from './services/login'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null);
  const [typeMessage, setTypeMessage] = useState(null);
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    window.location.reload();
  };

  const addBlog = (e) => {
    e.preventDefault();
    const payload = {title: newTitle, author: newAuthor, url: newUrl, likes: 0};

    blogService
      .create(payload)
      .then(response => {
            setBlogs([...blogs, response]);
            setMessage( `A new blog added ${response.title}`);
            setTypeMessage("success");
            setNewTitle("");
            setNewAuthor("");
            setNewUrl("");
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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  );

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        Title: 
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </div>
      <div>
        Author: 
        <input
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
        />
      </div>
      <div>
        Url: 
        <input
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
        />
      </div>
      <button type="submit">save</button>
    </form>  
  )

  return (
    <div>
      <Notification message={message} typeMessage={typeMessage}/>

      {
        user === null ? 
          <div>
            <h2>Log in to application</h2>
            {loginForm()}
            <br/>
          </div>  
          :
          <div>
            <div style={{display: "flex", gap: 5, alignItems: "center"}}>
              <p>{user.name} logged-in</p>
              <button onClick={handleLogout} style={{maxHeight: "fit-content"}}>logout</button>
            </div>
            <h2>create new</h2>
            {blogForm()}
            <h2>blogs</h2>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>
      }
    </div>
  )
}

export default App