import { Post } from "/Users/macbook/code/personal/freelance/ost-ts/ocean-state-tackle-ts/src/types/types.ts"

const BASE_URL: string = 'http://localhost:3000/blog/posts'

// const show = async () => {
//     try {
//         const res = await fetch(BASE_URL);
//         const data = await res.json()
//         console.log('Data:', data);
//         return data;
//     } catch (err) {
//         console.log(err);
//     }
// }

// export {show}

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

        return await res.json()
    } catch (err) {
        console.error("Fetch error in create function:", err);
        throw err; 
    }
}

// PUT - blog/posts/:id

const update = async (formData: Post, id: string) => {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), 
        });
        console.log('PUT INITIATED')
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return await res.json()
    } catch (err) {
        console.error("Fetch error in update function:", err);
        throw err
    }
}

export {
    index,
    create,
    update
}