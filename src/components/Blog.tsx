import NewBlogPost from "./NewBlogPost";

const Blog = () => {

    return (
    <>
    <div className="blogDiv">
    <h1>Blog</h1>
    <NewBlogPost/>
    {/* this is going to map all the blog posts from the db onto the dom */}
    {/* do i want this to be a component that is mapped?? like a blog card. will be a list with a key of id, will map over a fetched list of all posts and redner */}
    </div>
    </>
    );


  };
  
  export default Blog;