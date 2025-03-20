import { useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import * as blogService from '/Users/macbook/code/personal/freelance/ost-ts/ocean-state-tackle-ts/src/services/blogServices.ts'

const NewBlogPost = () => {

    const [images, setImages] = useState<ImageListType>([]);
    const maxNumber = 69;

    const [formData, setFormData] = useState({
        postTitle:'',
        youTubeID: '',
        postText: '',
        imageArray: images,
    })

    const handleAddPost = async (formData: { postTitle: string; youTubeID: string; postText: string; imageArray: never[]; }) => {
        try {
            const newPost = await blogService.create(formData);
            console.log(formData)
            setTimeout(windowReload, 2000)//ensures the page is reloaded when a post is made to get it in the list immidiately
            if (newPost.err) {
                throw new Error(newPost.err)
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

        handleAddPost({...formData, imageArray: imageBase64Array})
        // console.log(formData)
        console.log(imageBase64Array)
        setFormData({
            postTitle: '',
            youTubeID: '',
            postText: '',
            imageArray: []
        });
        setImages([])
    }

 

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const onChange = (
        imageList: ImageListType,
        addUpdateIndex: number[] | undefined,
      ) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList as never[]);
        setFormData({...formData, imageArray: imageList })
      };

//   console.log(formData)      

    return (
        <>
        <div className="newPostDiv">
        <h1 className="newPostHeader">New Blog Post</h1>
        <form className="newPostForm" onSubmit={handleSubmit}>
            <label htmlFor="postTitle">New Post: </label>
            <input
                id="postTitle"
                name="postTitle"
                value={formData.postTitle}
                placeholder="Post Title..."
                onChange={handleChange}
                required
            />
             <input
                id="youTubeID"
                name="youTubeID"
                value={formData.youTubeID}
                placeholder="YouTube ID"
                onChange={handleChange}
            />
            <textarea
                id="postText"
                name="postText"
                value={formData.postText}
                placeholder="Post Text..."
                // style={{
                //     width: 1000, 
                //     height: 300,
                // }}
                rows={10}
                cols={50}
                onChange={handleChange}    
            />

            <ImageUploading
                    multiple
                    value={images}
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
                            <img src={image.dataURL} alt="" width="100" />
                            <div className="image-item__btn-wrapper">
                            <button onClick={() => onImageUpdate(index)}>Update</button>
                            <button onClick={() => onImageRemove(index)}>Remove</button>
                            </div>
                        </div>
                        ))}
                    </div>
                    )}
            </ImageUploading>
            <button type="submit">Post</button>
        </form>

        
        </div>
        </>
    );
  };
  
  export default NewBlogPost;