import { useState } from "react";

const NewBlogPost = () => {

    const [formData, setFormData] = useState({
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
            <label htmlFor="postText">Post Text: </label>
            <input
                id="postText"
                name="postText"
                value={formData.postText}
                placeholder="Post Text..."
                style={{
                    width: 1000, 
                    height: 300,
                }}
                onChange={handleChange}    
            />
        </form>

        <button type="submit">Post</button>
        </>
    );
  };
  
  export default NewBlogPost;