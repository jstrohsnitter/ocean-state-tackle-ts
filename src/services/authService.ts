const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL; // this is our Express API url

const signup = async (formData: any) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const json = await res.json();
    if (json.err) {
      throw new Error(json.err);
    }
    if (json.token) {
        localStorage.setItem('token', json.token); // add this line to store the JWT token in localStorage
        const user = JSON.parse(atob(json.token.split('.')[1])); //this part of the code splits the JWT string into its three components using the dot as a delimiter, and selects the second element (index 1), which is the payload containing the user data
        return user;
      }
    return json;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const signin = async (user) => {
    try {
      const res = await fetch(`${BACKEND_URL}/users/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      const json = await res.json();
  
      if (json.error) {
        throw new Error(json.error);
      }
  
      if (json.token) {
        localStorage.setItem('token', json.token); // add this line to store the JWT token in localStorage
        const user = JSON.parse(atob(json.token.split('.')[1])); //this part of the code splits the JWT string into its three components using the dot as a delimiter, and selects the second element (index 1), which is the payload containing the user data
        return user;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const getUser = () =>  {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const user = JSON.parse(atob(token.split('.')[1]));
    return user;
  }

  const signout = () => {
    localStorage.removeItem('token');
  };
  
  export { signup, signin, getUser, signout };