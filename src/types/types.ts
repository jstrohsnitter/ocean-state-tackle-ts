import { ImageListType, ImageType } from "react-images-uploading";

export type Post = {
    _id: string,
    postTitle: string,
    youTubeID: string,
    postText: string,
    imageArray: (ImageArray | ImageListType | ImageType)[],
    createdAt: string,
}

export type ImageArray = {
    dataURL: undefined
    url: string,
    fileId: string,
}

export type newImagePost = {
    _id: string,
    postTitle: string,
    youTubeID: string,
    postText: string,
    imageArray: ImageArray[],
    createdAt: string,
    newBase64: (string | undefined)[]
}

