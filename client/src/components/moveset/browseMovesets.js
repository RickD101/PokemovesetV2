import getMovesets from "../../api/moveset/getMovesets.js";
import deleteMoveset from "../../api/moveset/deleteMoveset.js";
import page from "//unpkg.com/page/page.mjs";

const renderMovesets = (movesets)=>{
    movesets.forEach(moveset => {
        const emptyMessage = "No move saved."
        $('#contentContainer').append(/*template*/`
            <div class="col-12 saved-moveset-box mb-3" id=${moveset._id}>
                <div class="saved-moveset-title p-1">
                    ${moveset.name} for Generation ${moveset.generation}
                    <i class="fas fa-trash movebox-delete" title="Delete moveset" id="delete${moveset._id}"></i>
                </div>
                <div class="row">
                    <div style="width: 15%; margin: 4px 4px 4px 20px">
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
                    <div class="moveset-column" style="margin: 4px 20px 4px 4px">
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
            $(`#${moveset._id} .pokemon-info-box`).append(/*template*/`
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

        $(`#delete${moveset._id}`).off();
        $(`#delete${moveset._id}`).on('click',()=>{
            deleteMoveset({id: moveset._id});
            page.redirect('/movesets');
        });
    });
}

const browseMovesets = async ()=>{
    $('.popover').remove();
    $('#contentContainer').children().remove();

    const browse = await getMovesets();
    
    if (browse.status){
        renderMovesets(browse.movesets);
    }
    else{
        $('#contentContainer').append(/*template*/`
            <img src="../../assets/pikachu.gif">
            <h2 class="empty-moveset-message">${browse.msg}</h2>
        `);
    }
}

export default browseMovesets