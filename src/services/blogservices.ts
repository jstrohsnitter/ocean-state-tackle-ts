const BASE_URL: string = 'http://localhost:3000/blog/posts'

const show = async () => {
    try {
        const res = await fetch(BASE_URL);
        const data = await res.json()
        console.log('Data:', data);
        return data;
    } catch (err) {
        console.log(err);
    }
}

export {show}