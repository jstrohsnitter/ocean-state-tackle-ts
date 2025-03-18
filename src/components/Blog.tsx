import { useState, useEffect } from 'react'
import NewBlogPost from "./NewBlogPost";
import * as blogService from '/Users/macbook/code/personal/freelance/ost-ts/ocean-state-tackle-ts/src/services/blogServices.ts'
import PostList from './PostList/PostList';

const Blog = () => {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await blogService.index()
        if (fetchedPosts.err) {
          throw new Error(fetchedPosts.err)
        }
        setPosts(fetchedPosts)
      } catch (err) {
        console.log(err)
      }  
    }
    fetchPosts()
  }, []);
  

    return (
    <>
    <div className="blogDiv">
    <h1>Blog</h1>
    <NewBlogPost/>
    {/* this is going to map all the blog posts from the db onto the dom */}
    {/* do i want this to be a component that is mapped?? like a blog card. will be a list with a key of id, will map over a fetched list of all posts and redner */}
    <PostList posts={posts}/>
    </div>
    </>
    );


  };
  
  export default Blog;