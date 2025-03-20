import { SetStateAction, useState, ReactNode } from "react";
import { NavLink } from "react-router";
import { Route, Routes } from 'react-router';
import BlogPost from "../BlogPost/BlogPost";

const PostList = (props: { posts: any[]; }) => {
    
    return (
      <div>
        <h1>Post List</h1>
        <div>
            {!props.posts.length ? (
                <h2>No Posts Yet!</h2>
            ) : (<>
                <ul className="postListUl">
                {props.posts.map((post: { _id: string; postTitle?: string; createdAt?: string; postText?: string; }) => (
                    <NavLink className="postNavLink" key={post._id} to={`/blog/posts/${post._id}`}>{post.postTitle} {post.createdAt} {post.postText}</NavLink> 
            ))}
            </ul>
            </>
            )}
            
        </div>

      </div>
    );
  };
  
  export default PostList;