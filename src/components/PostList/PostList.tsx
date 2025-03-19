import { SetStateAction, useState, ReactNode } from "react";
import { NavLink } from "react-router";
import { Route, Routes } from 'react-router';
import BlogPost from "../BlogPost/BlogPost";

const PostList = (props: { posts: any[]; }) => {
    
    const [selectedPost, setSelectedPost] = useState('')

    const handleClick = async (post: { _id: SetStateAction<string>; }) => {
        setSelectedPost(post._id)
        
    }
  
    console.log(selectedPost)
    return (
      <div>
        <h1>Post List</h1>
        <div>
            {!props.posts.length ? (
                <h2>No Posts Yet!</h2>
            ) : (<>
                <ul className="postListUl">
                {props.posts.map((post: { _id: string; title?: string; createdAt?: string; text?: string; }) => (
                    <>
                    <NavLink onClick={() => handleClick(post)} className="postNavLink" key={post._id} to={`/blog/posts/${post._id}`}>{post.title} {post.createdAt} {post.text}</NavLink>
                    </>
                    
            ))}
            </ul>
            </>
            )}
            
        </div>

      </div>
    );
  };
  
  export default PostList;