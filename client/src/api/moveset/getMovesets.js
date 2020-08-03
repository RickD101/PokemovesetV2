// show all saved movesets backend API call
const getMovesets = async ()=>{
    try{
        const response = await fetch('/api/movesets', {
            method: 'GET',
            mode: 'cors',
            credentials: 'same-origin',
        });

        const data = await response.json();
        return data;
    }
    catch(err){
        console.log(err);
    }
}

export default getMovesets;