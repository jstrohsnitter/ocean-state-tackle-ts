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
                {props.posts.map((post: { _id: Key | null | undefined; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
                    <li key={post._id}>{post.title}</li>
            ))}
            </ul>
            )}
            
        </div>
      </div>
    );
  };
  
  export default PostList;