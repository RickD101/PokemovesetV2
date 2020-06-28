const axios = require('axios').default;

const searchPokemon = async (name, gen)=>{
    try{
        // query external API
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const pokemon = response.data;
        
        // map API data to custom object
        const currentPokemon = {
            name: pokemon.name,
            spriteURL: pokemon.sprites.front_default,
            info: {
                dexNumber: pokemon.id,
                type: [],
                stats: {
                    HP: pokemon.stats[5].base_stat,
                    ATK: pokemon.stats[4].base_stat,
                    DEF: pokemon.stats[3].base_stat,
                    SAK: pokemon.stats[2].base_stat,
                    SDF: pokemon.stats[1].base_stat,
                    SPD: pokemon.stats[0].base_stat
                }
            },
            moves: []
        };

        // append types to the corresponding array
        pokemon.types.forEach(type =>{
            currentPokemon.info.type.push(type.type.name);
        });

        // append moves to corresponding array
        pokemon.moves.forEach(move =>{
            move.version_group_details.forEach(details =>{
                if (details.version_group.name === gen){
                    currentPokemon.moves.push({
                        name: move.move.name,
                        learnMethod: details.move_learn_method.name,
                        learnAt: details.level_learned_at
                    });
                }
            });
        });

        // make additional API calls to include additional move data
        await Promise.all(currentPokemon.moves.map(async (move,index) =>{
            const res = await axios(`https://pokeapi.co/api/v2/move/${move.name}`);
            const moveData = res.data;
            currentPokemon.moves[index].type = moveData.type.name;
            currentPokemon.moves[index].category = moveData.damage_class.name;
            currentPokemon.moves[index].power = moveData.power;
            currentPokemon.moves[index].accuracy = moveData.accuracy;
            currentPokemon.moves[index].pp = moveData.pp;
            currentPokemon.moves[index].description = moveData.effect_entries[0].short_effect.replace('$effect_chance', moveData.effect_chance);
        }));

        return currentPokemon;
    }
    catch(err){
        return {
            err: err
        };
    }
}

exports.searchPokemon = searchPokemon;