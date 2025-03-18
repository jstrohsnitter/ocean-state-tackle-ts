import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

const PostList = (props) => {
    // Let's ensure we have data to work with before adding functionality!
    console.log(props);
  
    return (
      <div>
        <h1>Post List</h1>
        <div>
            {!props.posts.length ? (
                <h2>No Posts Yet!</h2>
            ) : ( 
                <ul>
                {props.posts.map((post) => (
                    <li key={post._id}>{post.title} {post.createdAt} {post.text}
                    </li>
            ))}
            </ul>
            )}
            
        </div>
      </div>
    );
  };
  
  export default PostList;