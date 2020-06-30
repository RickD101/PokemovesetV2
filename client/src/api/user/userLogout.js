const userLogout = async ()=>{
    try{
        const response = await fetch('/api/user/logout', {
            method: 'GET',
            mode: 'cors',
            credentials: 'same-origin'
        });
        const data = await response.json();
        return data;
    }
    catch(err){
        console.log(err);
    }
}

export default userLogout;