import { useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";

const NewBlogPost = () => {

    const [images, setImages] = useState([]);
    const maxNumber = 69;

    const [formData, setFormData] = useState({
        postTitle:'',
        youTubeID: '',
        postText: '',
        imageArray: images,
    })

    const handleAddPost = async (formData: { postTitle: string; youTubeID: string; postText: string; imageList: never[]; }) => {
        try {
            await console.log(formData)
        } catch (err) {
            console.log(err)
        }
    }

    const handleSubmit = async (event: {
        preventDefault(): unknown; postTitle?: string; youTubeID?: string; postText?: string; imageList?: never[]; event: React.FormEvent<HTMLFormElement> }) => {
        event.preventDefault()
        await handleAddPost(formData)
        console.log(formData)
        setFormData({postTitle: ''})
        setFormData({youTubeID: ''})
        setFormData({postText: ''})
        setImages([])
    }

 

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
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

      console.log(formData)      

    return (
        <>
        <div className="newPostDiv">
        <h1 className="newPostHeader">New Blog Post</h1>
        <form className="newPostForm" onSubmit={() => handleSubmit(formData)}>
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
                    name="imageList"
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