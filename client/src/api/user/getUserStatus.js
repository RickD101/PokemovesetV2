// get user status backend API call
const getUserStatus = async ()=>{
    try{
        const response = await fetch('/api/user/', {
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

export default getUserStatus;