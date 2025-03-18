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

console.log(await index())

export {
    index,
}