import { Post, newImagePost } from "/Users/macbook/code/personal/freelance/ost-ts/ocean-state-tackle-ts/src/types/types.ts"


const BASE_URL: string = 'http://localhost:3000/blog/posts'

const index = async () => {
    try {
        const res = await fetch(BASE_URL)
        return res.json()
    } catch (err) {
        console.log(err);
    }
}

// POST - blog/posts

const create = async (formData: Post) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        console.log('POST INITIATED')

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        return res.json()
    } catch (err) {
        console.error("Fetch error in create function:", err);
        throw err; 
    }
}

// GET - blog/posts/:id

const showById = async (id:string) => {
    try {
        const res = await fetch(`${BASE_URL}/${id}`)
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return await res.json()
    } catch (err) {
        console.error("Fetch error in show by ID function", err)
    }
}

// PUT - blog/posts/:id

const update = async (imageUpdate: newImagePost, id: string) => {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(imageUpdate), 
        });
        console.log('PUT INITIATED')
        console.log(imageUpdate)
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return await res.json()
    } catch (err) {
        console.error("Fetch error in update function:", err);
        throw err
    }
}

// DELETE - blog/posts/:id

const deletePost = async (id: string) => {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        })
        return res.json()
    } catch (err) {
        console.log(`Delete Services Error: ${err}`)
    }
}

export {
    index,
    create,
    showById,
    update,
    deletePost
}