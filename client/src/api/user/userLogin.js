// user login backend API call
const userLogin = async (req)=>{
    try{
        const response = await fetch('/api/user/login', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        });
        const data = await response.json();
        return data;
    }
    catch(err){
        console.log(err);
    }
}

export default userLogin;