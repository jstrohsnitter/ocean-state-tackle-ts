import {useState, useEffect} from "react"
import { useParams } from "react-router"
import { Post } from "/Users/macbook/code/personal/freelance/ost-ts/ocean-state-tackle-ts/src/types/types.ts"
import ImageUploading, { ImageListType } from "react-images-uploading";
import * as blogService from '/Users/macbook/code/personal/freelance/ost-ts/ocean-state-tackle-ts/src/services/blogServices.ts'

const BlogPost = () => {
    const { id } = useParams(); // Get post ID from URL
    const [post, setPost] = useState<Post>({
        _id: '',
        postTitle: '',
        youTubeID: '',
        postText: '',
        imageArray: [],
        createdAt: '',
    });
    const [edit, setEdit] = useState<boolean>(false)
    // const [cancel, setCancel] = useState<boolean>(false)

    const [images, setImages] = useState<ImageListType>([]);
    const maxNumber = 69;

    // const [formData, setFormData] = useState({
    //     postTitle:`${post.postTitle}`,
    //     youTubeID: '',
    //     postText: '',
    //     imageArray: images,
    // })
  
    useEffect(() => {
      fetch(`http://localhost:3000/blog/posts/${id}`) 
        .then((res) => res.json())
        .then((data) => setPost(data))
        .catch((err) => console.error("Error fetching post:", err));
        
    }, [id]); // Refetch if ID changes
  
    if (!post) return <p>Loading...</p>;
console.log(post)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPost({...post, [event.target.name]: event.target.value})
    }

    const handleEdit = () => {
        setEdit(true)
    }

    const handleCancel = () => {
        setEdit(false)
    }

    const handleUpdatePost = async (post: Post) => {
        
        try {
            const updatedPost = await blogService.update(post, `${post._id}`);
            console.log(post)
            setTimeout(windowReload, 2000)//ensures the page is reloaded when a post is made to get it in the list immidiately
            if (updatedPost.err) {
                throw new Error(updatedPost.err)
            }
        } catch (err) {
            console.log(err)
        }
    }

    function windowReload () {
        window.location.reload()
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault()

        const imageBase64Array = images.map(img => img.dataURL)

        handleUpdatePost({...post, imageArray: imageBase64Array})
        // console.log(formData)
        // console.log(imageBase64Array)
        // setFormData({
        //     postTitle: '',
        //     youTubeID: '',
        //     postText: '',
        //     imageArray: []
        // });
        // setImages([])
    }

    //if imageArray.index contains dataURL route it through the imagekit.io route
  

    const onChange = (
        imageList: ImageListType,
        addUpdateIndex: number[] | undefined,
      ) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList as never[]);
        setPost({...post, imageArray: imageList })
      };
  
    return ( <>
        {edit ? 
        
        <div className="newPostDiv">
        <h1 className="newPostHeader">{post.postTitle}</h1>
        <form className="newPostForm" onSubmit={handleSubmit}>
            <label htmlFor="postTitle">Update Post: </label>
            <input
                id="postTitle"
                name="postTitle"
                value={post.postTitle}
                placeholder="Post Title..."
                onChange={handleChange}
                required
            />
             <input
                id="youTubeID"
                name="youTubeID"
                value={post.youTubeID}
                placeholder="YouTube ID"
                onChange={handleChange}
            />
            <textarea
                id="postText"
                name="postText"
                value={post.postText}
                placeholder="Post Text..."
                rows={10}
                cols={50}
                onChange={handleChange}    
            />

            <ImageUploading
                    multiple
                    value={post.imageArray}
                    onChange={onChange}
                    maxNumber={maxNumber}
                >
                    {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps
                    }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                        <button
                        style={isDragging ? { color: "red" } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                        >
                        Click or Drop here
                        </button>
                        &nbsp;
                        <button onClick={onImageRemoveAll}>Remove all images</button>
                        {imageList.map((image, index) => (
                        <div key={index} className="image-item">
                            <img src={image.url || image.dataURL} alt="" width="100" />
                            <div className="image-item__btn-wrapper">
                            <button onClick={() => onImageUpdate(index)}>Update</button>
                            <button onClick={() => onImageRemove(index)}>Remove</button>
                            </div>
                        </div>
                        ))}
                    </div>
                    )}
            </ImageUploading>
            <button type="submit">Update Post</button>
            <button onClick={handleCancel}>Cancel</button>
        </form>

        
        </div>
        : 
            <div className="blogPostDiv">
            <h2 className="blogPostTitle">{post.postTitle}</h2>
            <p className="blogPostText">{post.postText}</p>
            <p className="blogPostText">YouTube ID: {post.youTubeID}</p>

            {post.imageArray && post.imageArray.length > 0 && (
                <div className="imageContainer">
                    {post.imageArray.map((image: any, index: number) => (
                        <img key={index} src={image.url} alt={`Image ${index}`} width="200" />
                    ))}
                </div>
            )}
            <button onClick={() => handleEdit(post)}>Edit</button>
        </div>
        }
        </>
    );
}

export default BlogPost