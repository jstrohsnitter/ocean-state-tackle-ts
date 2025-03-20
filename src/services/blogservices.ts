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

const create = async (formData: { postTitle: string; youTubeID: string; postText: string; imageArray: never[]; }) => {
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
        throw err; // ✅ Re-throw error so it can be caught in the calling function
    }
}

export {
    index,
    create,
}