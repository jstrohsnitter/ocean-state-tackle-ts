export type Post = {
    _id: string,
    postTitle: string,
    youTubeID: string,
    postText: string,
    imageArray: ImageArray[],
    createdAt: string,
}

export type ImageArray = {
    url: string,
    fileId: string,
}