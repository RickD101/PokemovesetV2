const renderPokemon = (pokemon)=>{

    // render the basic structure
    $('#contentContainer').append(/*template*/`
        <div class="row d-flex justify-content-center" style="margin-top: 86px;">
            <div class="col-3 results-col" id="info-col"></div>
            <div class="col-5 results-col" id="move-col"></div>
            <div class="col-4 results-col d-flex flex-column" id="saved-col"></div>
        </div>
    `);
    
    // render the info column
    $('#info-col').append(/*template*/`
        <img class="pokemon-sprite" src=${pokemon.spriteURL}>
        <div class="pokemon-info-box pb-2">
            <div class="pokemon-name">${pokemon.name}</div>
            <div class="mb-1">#${pokemon.info.dexNumber}</div>
        </div>
    `);

    pokemon.info.type.forEach(type =>{
        $('.pokemon-info-box').append(/*template*/`
            <span class="pokemon-type pokemon-type-${type}">${type}</span>
        `);
    });

    $('#info-col').append(/*template*/`
        <div class="pokemon-stats">
            <div class="pokemon-stat-title">BASE STATS</div>
            <ul class="list-group list-group-flush stat-list">
                <li class="list-group-item stat-top"><b>HP:</b> ${pokemon.info.stats.HP}</li>
                <li class="list-group-item stat"><b>Attack:</b> ${pokemon.info.stats.ATK}</li>
                <li class="list-group-item stat"><b>Defense:</b> ${pokemon.info.stats.DEF}</li>
                <li class="list-group-item stat"><b>Special Attack:</b> ${pokemon.info.stats.SAK}</li>
                <li class="list-group-item stat"><b>Special Defense:</b> ${pokemon.info.stats.SDF}</li>
                <li class="list-group-item stat" id="last-stat"><b>Speed:</b> ${pokemon.info.stats.SPD}</li>
            </ul>
        </div>
    `);
}

const renderMoveList = (pokemon)=>{
    // render the basic tab structure
    $('#move-col').append(/*template*/`
        <div class="move-list-title">Available moves in Generation ${pokemon.generation}</div>
        <nav>
            <div class="nav nav-tabs justify-content-center" id="nav-tab" role="tablist">
                <a class="nav-item nav-link active" id="nav-level-up-tab" data-toggle="tab" href="#nav-level-up" role="tab">Level up</a>
                <a class="nav-item nav-link" id="nav-machine-tab" data-toggle="tab" href="#nav-machine" role="tab">TM/HM</a>
                <a class="nav-item nav-link" id="nav-egg-tab" data-toggle="tab" href="#nav-egg" role="tab">Egg</a>
                <a class="nav-item nav-link" id="nav-tutor-tab" data-toggle="tab" href="#nav-tutor" role="tab">Tutor</a>
            </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-level-up" title="level up" role="tabpanel"></div>
            <div class="tab-pane fade" id="nav-machine" title="TM or HM" role="tabpanel"></div>
            <div class="tab-pane fade" id="nav-egg" title="egg" role="tabpanel"></div>
            <div class="tab-pane fade" id="nav-tutor" title="tutor" role="tabpanel"></div>
        </div>
    `);

    pokemon.moves.forEach(move =>{
        let card = $(/*template*/`
            <div class="card" move="${move.name}" style="width: 95%;"></div>
        `);
        let cardBody = $(/*template*/`
            <div class="card-body">
                <span class="move-title">${move.name.replace("-"," ")}</span>
                <span class="pokemon-type pokemon-type-${move.type}">${move.type}</span>
                <span class="pokemon-type move-category-${move.category}">${move.category}</span><br/>
                <ul class="list-group list-group-horizontal move-stats">
                    <li class="list-group-item flex-fill move-stat move-stat-mid"><b>PWR:</b> ${move.power}</li>
                    <li class="list-group-item flex-fill move-stat move-stat-mid"><b>ACC:</b> ${move.accuracy}</li>
                    <li class="list-group-item flex-fill move-stat"><b>PP:</b> ${move.pp}</li>
                </ul>
            </div>
        `);
        if (move.learnMethod === "level-up"){
            $(cardBody).append(/*template*/`
                <p class="card-text">Learns at level ${move.learnAt}.</p>
            `);
        }
        $(cardBody).append(/*template*/`
            <p class="card-text">${move.description}</p>
        `);
        $(card).append(cardBody);
        $(card).draggable({
            helper: function(e){
                return $(
                    `<div class="move-helper">
                        <span class="move-title">${move.name}</span>
                    </div>`
                );
            },
            scroll: false,
            revert: 'invalid',
            cursorAt: {bottom: 0, left: 100},
            zIndex: 1
        });

        $(`#nav-${move.learnMethod}`).append(card);
    });

    let tabs = $('#nav-tabContent').children();
    for (let i=0; i<tabs.length; i++){
        if ($(tabs[i]).children().length == 0){
            $(tabs[i]).append(/*template*/`
                <div class="empty-move-message">
                    ${pokemon.name} learns no ${$(tabs[i]).attr('title')} moves in generation ${pokemon.generation}.
                </div>
            `);
        }
    }
}

const searchResults = ()=>{
    $('#contentContainer').children().remove();
    let pokemon = JSON.parse(sessionStorage.getItem('pokemon'));

    renderPokemon(pokemon);
    renderMoveList(pokemon);
}

export default searchResults;