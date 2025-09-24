import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [sortedBlogs, setSortedBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [typeMessage, setTypeMessage] = useState(null);
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, []);

  useEffect(() => {
    setSortedBlogs([...blogs].sort((a, b) => b.likes - a.likes))
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const updateBlog = (blog) => {
    const payload = {title: blog.title, author: blog.author, url: blog.url, likes: blog.likes + 1};
    
    blogService
    .update(blog.id, payload)
    .then(response => {
        const updatedBlogs = blogs.map(blog => 
            blog.id === response.id ? response : blog
        );
        setBlogs(updatedBlogs); 
        setMessage( `Blog updated ${response.title}`);
        setTypeMessage("success");
        blogFormRef.current.toggleVisibility();
        setTimeout(() => {
            setMessage(null);
        }, 5000)
    })
    .catch(error => {
        setMessage(error.response.data.error);
        setTypeMessage("error");
        setTimeout(() => {
            setMessage(null);
        }, 5000)
    });
  };
  
  const removeBlog = (blogToRemove) => {
    if (window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}?`)) {
        blogService
        .remove(blogToRemove.id)
        .then(() => {
            const updatedBlogs = blogs.filter(blog => blog.id !== blogToRemove.id);
            setBlogs(updatedBlogs);
            setMessage(`Blog removed ${blogToRemove.title}`);
            setTypeMessage("success");
            setTimeout(() => {
                setMessage(null);
            }, 5000)
        })
        .catch(error => {
            setMessage(error.response.data.error);
            setTypeMessage("error");
            setTimeout(() => {
                setMessage(null);
            }, 5000)
        });
    }
  };
  
  return (
    <div>
      <Notification message={message} typeMessage={typeMessage}/>

      {
        user === null ? 
            <LoginForm setUser={setUser} setMessage={setMessage} setTypeMessage={setTypeMessage}/> :
          <div>
            <div style={{display: "flex", gap: 5, alignItems: "center"}}>
              <p>{user.name} logged-in</p>
              <button onClick={loginService.logout} style={{maxHeight: "fit-content"}}>logout</button>
            </div>
            <Togglable buttonLabel="create new blog" ref={blogFormRef}>
              <BlogForm 
                blogs={blogs} 
                setBlogs={setBlogs} 
                setMessage={setMessage} 
                setTypeMessage={setTypeMessage}
                blogFormRef={blogFormRef}
              />
            </Togglable>

            <h2>blogs</h2>
            {sortedBlogs.map(blog =>
              <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} user={user}/>
            )}
          </div>
      }
    </div>
  )
}

export default App