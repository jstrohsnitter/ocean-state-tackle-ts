import { useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";

const NewBlogPost = () => {

    const [images, setImages] = useState([]);
    const maxNumber = 69;

    const [formData, setFormData] = useState({
        postTitle:'',
        youTubeID: '',
        postText: '',
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        setFormData({postTitle: ''})
        setFormData({youTubeID: ''})
        setFormData({postText: ''})
        setImages([])
    }

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const onChange = (
        imageList: ImageListType,
        addUpdateIndex: number[] | undefined
      ) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList as never[]);
      };

    return (
        <>
        <div className="newPostDiv">
        <h1 className="newPostHeader">New Blog Post</h1>
        <form className="newPostForm" onSubmit={handleSubmit}>
            <label htmlFor="newPost">New Post: </label>
            <input
                id="postTitle"
                name="postTitle"
                value={formData.postTitle}
                placeholder="Post Title..."
                onChange={handleChange}
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
        </form>

        <button type="submit">Post</button>
        </div>
        </>
    );
  };
  
  export default NewBlogPost;