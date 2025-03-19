import {useState, useEffect} from "react"
import { useParams } from "react-router"

const BlogPost = () => {
    const { id } = useParams(); // Get post ID from URL
    const [post, setPost] = useState(null);
  
    useEffect(() => {
      fetch(`http://localhost:3000/blog/posts/${id}`) // Replace with your API endpoint
        .then((res) => res.json())
        .then((data) => setPost(data))
        .catch((err) => console.error("Error fetching post:", err));
    }, [id]); // Refetch if ID changes
  
    if (!post) return <p>Loading...</p>;
  
    return (
      <div>
        <h2>{post.title}</h2>
        <p>{post.text}</p>
      </div>
    );
}

export default BlogPost