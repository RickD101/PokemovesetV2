import getMovesets from "../../api/moveset/getMovesets.js";
import deleteMoveset from "../../api/moveset/deleteMoveset.js";

const renderMovesets = (movesets)=>{
    movesets.forEach(moveset => {
        const emptyMessage = "No move saved."
        const pokemonName = moveset.pokemon.name.charAt(0).toUpperCase() + moveset.pokemon.name.slice(1);
        $('#contentContainer').append(/*template*/`
            <div class="col-12 saved-moveset-title mt-2" id=${moveset._id}>
                <div class="p-1">
                    <i class="fas fa-chevron-circle-down movebox-show" title="Show moveset" id="show${moveset._id}"></i>
                    ${moveset.name} <i>for ${pokemonName} in Generation ${moveset.generation}</i>
                    <i class="fas fa-trash movebox-delete" title="Delete moveset" id="delete${moveset._id}"></i>
                </div>
            </div>
            <div class="col-12 saved-moveset-box" style="display: none;" id="content${moveset._id}">
                <div class="row" style="margin:0">
                    <div style="width: 15.4%; margin: 4px">
                        <img class="pokemon-sprite-moveset" src=${moveset.pokemon.spriteURL}>
                        <div class="pokemon-info-box pb-2">
                            <div class="pokemon-name-moveset">${moveset.pokemon.name}</div>
                            <div class="mb-1">#${moveset.pokemon.dexNumber}</div>
                        </div>
                    </div>
                    <div style="width: 20%">
                        <div class="pokemon-stats">
                            <div class="pokemon-stat-title">BASE STATS</div>
                            <ul class="list-group list-group-flush stat-list">
                                <li class="list-group-item stat-top-moveset"><b>HP:</b> ${moveset.pokemon.stats.HP}</li>
                                <li class="list-group-item stat-moveset"><b>Attack:</b> ${moveset.pokemon.stats.ATK}</li>
                                <li class="list-group-item stat-moveset"><b>Defense:</b> ${moveset.pokemon.stats.DEF}</li>
                                <li class="list-group-item stat-moveset"><b>Special Attack:</b> ${moveset.pokemon.stats.SAK}</li>
                                <li class="list-group-item stat-moveset"><b>Special Defense:</b> ${moveset.pokemon.stats.SDF}</li>
                                <li class="list-group-item stat-moveset"><b>Speed:</b> ${moveset.pokemon.stats.SPD}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="moveset-column" style="margin: 4px 0 4px 4px">
                        <div class="moveset-card" style="margin-bottom: 4px" id="0${moveset._id}">
                            <span class="empty-move">${emptyMessage}</span>
                        </div>
                        <div class="moveset-card" id="1${moveset._id}">
                            <span class="empty-move">${emptyMessage}</span>
                        </div>
                    </div>
                    <div class="moveset-column" style="margin: 4px">
                        <div class="moveset-card" style="margin-bottom: 4px" id="2${moveset._id}">
                            <span class="empty-move">${emptyMessage}</span>
                        </div>
                        <div class="moveset-card" id="3${moveset._id}">
                            <span class="empty-move">${emptyMessage}</span>
                        </div>
                    </div>
                </div>
            </div>
        `);

        moveset.pokemon.type.forEach(type =>{
            $(`#content${moveset._id} .pokemon-info-box`).append(/*template*/`
                <span class="pokemon-type pokemon-type-${type}">${type}</span>
            `);
        });

        for (let i=0; i<4; i++){
            const move = moveset.moves[`move${i}`];
            if (move){
                $(`#${i}${moveset._id}`).html(/*template*/`
                    <div class="moveset-card-body">
                        <span class="moveset-move-title">${move.name.replace(/-/g," ")}</span>
                        <span class="moveset-pokemon-type pokemon-type-${move.type}" >${move.type}</span>
                        <span class="moveset-pokemon-type move-category-${move.category}">${move.category}</span><br/>
                        <ul class="list-group list-group-horizontal moveset-move-stats">
                            <li class="list-group-item flex-fill moveset-stat move-stat move-stat-mid"><b>PWR:</b> ${move.power}</li>
                            <li class="list-group-item flex-fill moveset-stat move-stat move-stat-mid"><b>ACC:</b> ${move.accuracy}</li>
                            <li class="list-group-item flex-fill moveset-stat move-stat"><b>PP:</b> ${move.pp}</li>
                        </ul>
                        <p class="d-flex align-items-center justify-content-center card-text moveset-stat moveset-description">${move.description}</p>
                    </div>
                `);
            }
        }

        $(`#show${moveset._id}`).off();
        $(`#show${moveset._id}`).on('click',()=>{
            $(`#content${moveset._id}`).toggle('slide',{direction: 'up'}, 500);
            $(`#show${moveset._id}`).toggleClass('fa-chevron-circle-down');
            $(`#show${moveset._id}`).toggleClass('fa-chevron-circle-up');
            if ($(`#show${moveset._id}`).attr('title') === 'Show moveset'){
                $(`#show${moveset._id}`).attr('title','Hide moveset');
            }
            else{
                $(`#show${moveset._id}`).attr('title','Show moveset');
            }
        });

        $(`#delete${moveset._id}`).off();
        $(`#delete${moveset._id}`).on('click',async ()=>{
            await deleteMoveset({id: moveset._id});
            $(`#${moveset._id}`).hide('slow',()=>{$(`#${moveset._id}`).remove()});
            $(`#content${moveset._id}`).hide('slow',()=>{$(`#content${moveset._id}`).remove()});
            if ($('#contentContainer').children().length == 3){
                setTimeout(() => {
                    $('#contentContainer').html(/*template*/`
                        <div class="d-flex flex-column justify-content-center align-items-center" style="height: 50vh">    
                            <img src="../../assets/pikachu.gif">
                            <h2 class="empty-moveset-message">No movesets found.</h2>
                        </div>
                    `); 
                }, 1000);
            }
        });
    });
    $('#contentContainer').append('<div style="height:20px;"></div>');
}

const browseMovesets = async ()=>{
    $('.popover').remove();
    $('#contentContainer').children().remove();

    const browse = await getMovesets();
    
    if (browse.status){
        renderMovesets(browse.movesets);
    }
    else{
        $('#contentContainer').html(/*template*/`
            <div class="d-flex flex-column justify-content-center align-items-center" style="height: 50vh">    
                <img src="../../assets/pikachu.gif">
                <h2 class="empty-moveset-message">${browse.msg}</h2>
            </div>
        `);
    }
}

export default browseMovesets