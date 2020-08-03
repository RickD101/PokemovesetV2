// save new moveset backend API call
const newMoveset = async (req)=>{
    try{
        const response = await fetch('/api/movesets/new', {
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

export default newMoveset;