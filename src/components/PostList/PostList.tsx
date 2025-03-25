import { NavLink } from "react-router";
import { Post } from "/Users/macbook/code/personal/freelance/ost-ts/ocean-state-tackle-ts/src/types/types.ts"

const PostList = (props: { posts: Post[]; }) => {
    
    // let dateArray = []
    // const dateMap = props.posts.map(timeStamp => {
    //     dateArray.push(timeStamp.createdAt)
    // })

    // console.log(dateArray)

    const sortedArray: Post[] = [...props.posts].sort((b, a) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    console.log(sortedArray)
    console.log(props.posts)
    return (
      <div>
        <h1>Post List</h1>
        <div>
            {!props.posts.length ? (
                <h2>No Posts Yet!</h2>
            ) : (<>
                <ul className="postListUl">
                {sortedArray.map((post: Post) => (
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