import {useState, useEffect} from "react"
import { useParams } from "react-router"

const BlogPost = () => {
    const { id } = useParams(); // Get post ID from URL
    const [post, setPost] = useState(null);
  
    useEffect(() => {
      fetch(`http://localhost:3000/blog/posts/${id}`) 
        .then((res) => res.json())
        .then((data) => setPost(data))
        .catch((err) => console.error("Error fetching post:", err));
    }, [id]); // Refetch if ID changes
  
    if (!post) return <p>Loading...</p>;
  
    return (
        <div>
            <h2>{post.postTitle}</h2>
            <p>{post.postText}</p>
            <p>YouTube ID: {post.youTubeID}</p>

            {post.imageArray && post.imageArray.length > 0 && (
                <div>
                    {post.imageArray.map((image: any, index: number) => (
                        <img key={index} src={image.url} alt={`Image ${index}`} width="200" />
                    ))}
                </div>
            )}
        </div>
    );
}

export default BlogPost