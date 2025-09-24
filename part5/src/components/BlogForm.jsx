import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({blogs, setBlogs, setMessage, setTypeMessage, blogFormRef}) => {

    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

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

    return (
        <div>
            <h2>create new</h2>
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
                <button type="submit">create</button>
            </form>  
        </div>
    )
}

export default BlogForm