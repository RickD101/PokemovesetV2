const searchPokemon = async (req)=>{
    try{
        const response = await fetch('/api/pokeAPI', {
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

export default searchPokemon;