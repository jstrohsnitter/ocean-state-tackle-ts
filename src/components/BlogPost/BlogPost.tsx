import {useState, useEffect} from "react"
import { useParams } from "react-router"
import { Post, newImagePost } from "/Users/macbook/code/personal/freelance/ost-ts/ocean-state-tackle-ts/src/types/types.ts"
import ImageUploading, { ImageListType } from "react-images-uploading";
import * as blogService from '/Users/macbook/code/personal/freelance/ost-ts/ocean-state-tackle-ts/src/services/blogServices.ts'

const BlogPost = () => {

// ================================ STATE VARIABLES ===========================================
    const { id } = useParams<{id: string}>(); // Get post ID from URL
    
    const [post, setPost] = useState<Post>({
        _id: '',
        postTitle: '',
        youTubeID: '',
        postText: '',
        imageArray: [],
        createdAt: '',
    });

    const [imageUpdate, setImageUpdate] = useState<newImagePost>({
        _id: '',
        postTitle: '',
        youTubeID: '',
        postText: '',
        imageArray: [],
        createdAt: '',
        newBase64: [],
    })

    const [edit, setEdit] = useState<boolean>(false)
    // const [cancel, setCancel] = useState<boolean>(false)

    const [images, setImages] = useState<ImageListType>([]);
    const maxNumber = 69;
//===================== FETCH POST BY ID ===============================================================
 
    useEffect(() => {
    const getById = async () => {
        try {
            const fetchedPost = await blogService.showById(id)
            if (!ignore) {
                setPost(fetchedPost)
                }       
        } catch (err) {
            console.error("Error when fetching post in BlogPost component", err)
        }
    }
        let ignore = false;
         getById()
        return () => {
           ignore = true;
         }
     }, [id])

     if (!post) return <p>Loading...</p>;
     if (!id) return <p>Post not found. Make sure the post ID is valid.</p>

     
//======================= HANDLE CHANGE (FORM), HANDLE EDIT, HANDLE CANCEL =====================================
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
//======================= HELPER FUNCTIONS =============================================
    function windowReload () {
        window.location.reload()
    }

    function backToBlog () {
        history.back()
    }

//================== HANDLEUPDATE UPDATE POST -- FRONT END TO BACK END REQUEST ===========================================================
    const handleUpdatePost = async (imageUpdate: newImagePost) => {
        
        try {
            const updatedPost = await blogService.update(imageUpdate, `${imageUpdate._id}`);
            setTimeout(windowReload, 2000)//ensures the page is reloaded when a post is made to updated, brings user back to postlist/new blog post
            if (updatedPost.err) {
                throw new Error(updatedPost.err)
            }
        } catch (err) {
            console.log(err)
        }
    }


//================== HANDLESUBMIT UPDATE POST =======================================================================
   
    const handleSubmit = (event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault()

        const imageToUpload: ImageListType = post.imageArray.filter(img => img.dataURL !== undefined);
        post.imageArray = post.imageArray.filter(img => img.dataURL === undefined);
        console.log(post.imageArray)

        const newBase64 = imageToUpload.map(img => img.dataURL)
        console.log(newBase64)

        const updatedPost = { ...post, newBase64 };
        setImageUpdate(updatedPost);
        handleUpdatePost(updatedPost);     
    }

//======================= HANDLE DELETE =================================================================

    const handleDelete = async () => {
        try {
            const deletedPost = await blogService.deletePost(post._id)
            // setTimeout(backToBlog, 500)
            backToBlog()
            if (deletedPost.err) {
                throw new Error(deletedPost.err)
            }
        } catch (err) {
            console.log(`DELETE ERRROR: ${err}`)
        }
    }
    
  
//=====================IMAGE UPLOAD ONCHANGE==========================================
    const onChange = (
        imageList: ImageListType,
        addUpdateIndex: number[] | undefined,
      ) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList as never[]);
        setPost({...post, imageArray: imageList })
      };
  // ========================= RETURN =====================================================
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
            <button className="updatePost" type="submit">Update Post</button>
            
            <button onClick={handleCancel} className="cancelUpdateButton">Cancel</button>
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
            <button onClick={() => handleEdit()}>Edit</button>
            <button className="deletePost" onClick={handleDelete}>Delete</button>
        </div>
        }
        </>
    );
}

export default BlogPost

//===========================SCRAP PILE=================================================================
      // console.log(formData)
        // console.log(imageBase64Array)
        // setFormData({
        //     postTitle: '',
        //     youTubeID: '',
        //     postText: '',
        //     imageArray: []
        // });
        // setImages([])

//if imageArray.index contains dataURL route it through the imagekit.io route

    //     post.imageArray.forEach((img, index) => {
    //        if (img.dataURL != undefined) {
    //         // console.log(img)
    //         imageToUpload.push(img)
    //         post.imageArray.splice(index, 1)
    //         console.log(imageToUpload)
    //         console.log(post.imageArray)
    //        } else {
    //         console.log(img)
    //        }
    // })

          // const imageBase64Array = images.map(img => img.dataURL)

        ////loop through imageArray
        ////if imageArray[index] contains url and file id, do nothing
        ////if imageArray[index] contains dataURL, extract base 64 take it out and add it to a new array

        //take the new array and upload it to imagekit
        //handleNewImageUplaod fetch to imagekit
        //get the new url and append it to imageArray

        // setImageUpdate({...post, newBase64: newBase64})
        // console.log(imageUpdate)

        // handleUpdatePost(imageUpdate)


    // const [formData, setFormData] = useState({
    //     postTitle:`${post.postTitle}`,
    //     youTubeID: '',
    //     postText: '',
    //     imageArray: images,
    // })

       // useEffect(() => {
    //   fetch(`http://localhost:3000/blog/posts/${id}`) 
    //     .then((res) => res.json())
    //     .then((data) => setPost(data))
    //     .catch((err) => console.error("Error fetching post:", err));
        
    // }, [id]); // Refetch if ID changes