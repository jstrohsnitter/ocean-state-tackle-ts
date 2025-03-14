import { useState } from "react";

const NewBlogPost = () => {

    const [formData, setFormData] = useState({
        postTitle:'',
        postText: '',
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        setFormData({postText: ''})
    }

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    return (
        <>
        <h1 className="New Post Header">New Blog Post</h1>
        <form className="newPostForm" onSubmit={handleSubmit}>
            <label htmlFor="newPost">New Post: </label>
            <input
                id="postTitle"
                name="postTitle"
                value={formData.postTitle}
                placeholder="Post Title..."
                onChange={handleChange}
            />
            <textarea
                id="postText"
                name="postText"
                value={formData.postText}
                placeholder="Post Text..."
                // style={{
                //     width: 1000, 
                //     height: 300,
                // }}
                rows={10}
                cols={50}
                onChange={handleChange}    
            />
        </form>

        <button type="submit">Post</button>
        </>
    );
  };
  
  export default NewBlogPost;