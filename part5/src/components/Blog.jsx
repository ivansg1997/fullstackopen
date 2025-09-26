import { useState } from "react";

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  
  const [isVisible, setIsVisible] = useState(false);
  const blogStyle = {
    paddingLeft: 2,
    paddingTop: 10,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5,
    borderRadius: "5px",
  }

  return (

    <div className="blog" style={blogStyle}>
        {blog.title} 
        <button style={{marginLeft: 5}} onClick={(e) => {
            e.preventDefault();
            setIsVisible(!isVisible)
        }}>{isVisible ? "hide" : "show"}</button>
        {
          isVisible && 
          <div>
            <div>{blog.url}</div>
            <div>
              likes: {blog.likes}
              <button style={{marginLeft: 5}} onClick={(e) => {
                  e.preventDefault();
                  updateBlog(blog)
                }}
              >
                like
              </button>
            </div>
            <div>{blog.author}</div>
            {
              user?.username === blog?.user?.username &&
              <button style={{background: "blue", color: "white", borderRadius: '5px'}} onClick={(e) => {
                  e.preventDefault();
                  removeBlog(blog)
                }}
              >
                remove
              </button>
            }
          </div>
        }
        
  </div>
)}

export default Blog;