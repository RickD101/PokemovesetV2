// delete user backend API call
const deleteUser = async ()=>{
    try{
        const response = await fetch('/api/user/delete', {
            method: 'DELETE',
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

export default deleteUser;