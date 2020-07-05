import getUserStatus from "../../api/user/getUserStatus.js";
import newMoveset from "../../api/moveset/newMoveset.js";

const renderSaveList = (pokemon, movesets)=>{
    const emptyMessage = 'Drag and drop a move here...';
    let pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    pokemonName = pokemonName.replace(/-/g, " ");
    for (let i=1; i<=3; i++){
        $('#saved-col').append(/*template*/`
            <div class="flex-fill moveset-box d-flex flex-column" id="moveBox${i}">
                <div class="moveset-box-title">
                    <input class="form-control form-control-sm movebox-name" type="text" value="${pokemonName} Moveset ${i}" placeholder="Enter a moveset name..." id="name${i}">
                    <i class="fas fa-save movebox-save" title="Save moveset" id="save${i}"></i>
                    <i class="fas fa-trash movebox-delete" title="Clear moveset" id="delete${i}"></i>
                </div>
                <div class="moveset-box-movebox d-flex flex-column flex-fill">
                    <div class="moveset-box-move flex-fill d-flex align-items-center justify-content-center"
                    id="moveBox${i}Move1">
                        ${emptyMessage}
                    </div>
                    <div class="moveset-box-move flex-fill d-flex align-items-center justify-content-center"
                    id="moveBox${i}Move2">
                        ${emptyMessage}
                    </div>
                    <div class="moveset-box-move flex-fill d-flex align-items-center justify-content-center"
                    id="moveBox${i}Move3">
                        ${emptyMessage}
                    </div>
                    <div class="moveset-box-move flex-fill d-flex align-items-center justify-content-center"
                    id="moveBox${i}Move4">
                        ${emptyMessage}
                    </div>
                </div>
            </div>
        `);
    }

    $('.movebox-delete').off();
    $('.movebox-delete').on('click', event=>{
        clearMoveset(event, pokemon, movesets, pokemonName, emptyMessage);
    });

    $('.movebox-save').off();
    $('.movebox-save').on('click', event=>{
        saveMoveset(event, pokemon, movesets);
    });


    $('.moveset-box-move').droppable({
        drop: function (event,ui){
            const moveboxID = $(event.target).attr('id');
            const moveIndex = $(ui.draggable).attr('index');
            saveMove(pokemon.moves[moveIndex], moveboxID, movesets, moveIndex);
        }
    });
}

const clearMoveset = (event, pokemon, movesets, pokemonName, emptyMessage)=>{
    const boxNumber = event.target.id.charAt(6);
    $(`#moveBox${boxNumber} .moveset-box-movebox`).html(/*template*/`
        <div class="moveset-box-move flex-fill d-flex align-items-center justify-content-center"
        id="moveBox${boxNumber}Move1">
            ${emptyMessage}
        </div>
        <div class="moveset-box-move flex-fill d-flex align-items-center justify-content-center"
        id="moveBox${boxNumber}Move2">
            ${emptyMessage}
        </div>
        <div class="moveset-box-move flex-fill d-flex align-items-center justify-content-center"
        id="moveBox${boxNumber}Move3">
            ${emptyMessage}
        </div>
        <div class="moveset-box-move flex-fill d-flex align-items-center justify-content-center"
        id="moveBox${boxNumber}Move4">
            ${emptyMessage}
        </div>
    `);
    
    $(`#moveBox${boxNumber} .moveset-box-movebox .moveset-box-move`).droppable({
        drop: function (event,ui){
            const moveboxID = $(event.target).attr('id');
            const moveIndex = $(ui.draggable).attr('index');
            saveMove(pokemon.moves[moveIndex], moveboxID, movesets, moveIndex);
        }
    });
    
    $(`#name${boxNumber}`).val(`${pokemonName} Moveset ${boxNumber}`);

    movesets[`moveset${boxNumber}`] = [{},{},{},{}];
}

const saveMoveset = async (event, pokemon, movesets)=>{
    const userLoggedIn = await getUserStatus();
    const boxNumber = event.target.id.charAt(4);
    const moveset = movesets[`moveset${boxNumber}`];
    let movesetEmpty = true;

    moveset.forEach(move => {
        if (move.name){
            movesetEmpty = false;
        }
    });

    if (!userLoggedIn.status){
        $('#loginDropButton').popover('dispose');
        $(`#loginDropButton`).popover({
            content: `Please log in to save movesets!`,
            placement: "left",
            animation: true,
            trigger: "manual"
        });
        $(`#loginDropButton`).popover('show');
        setTimeout(() => {
            $(`#loginDropButton`).popover('hide');
        }, 3000);
    }
    else if (userLoggedIn.status && movesetEmpty){
        $(`#moveBox${boxNumber}`).popover('dispose');
        $(`#moveBox${boxNumber}`).popover({
            content: `You cannot save an empty moveset!`,
            placement: "left",
            animation: true,
            trigger: "manual"
        });
        $(`#moveBox${boxNumber}`).popover('show');
        setTimeout(() => {
            $(`#moveBox${boxNumber}`).popover('hide');
        }, 3000);
    }
    else if (userLoggedIn.status){
        const movesetData = {moves:{}};

        movesetData.name = $(`#name${boxNumber}`).val();
        movesetData.pokemon = {
            name: pokemon.name,
            spriteURL: pokemon.spriteURL,
            dexNumber: pokemon.info.dexNumber,
            type: pokemon.info.type,
            stats: pokemon.info.stats
        };
        movesetData.generation = pokemon.generation;

        moveset.forEach((move,index)=>{
            if (move.name){
                movesetData.moves[`move${index}`] = {
                    name: move.name,
                    type: move.type,
                    category: move.category,
                    power: move.power,
                    accuracy: move.accuracy,
                    pp: move.pp,
                    description: move.description,
                    learnMethod: move.learnMethod,
                    learnAt: move.learnAt
                }
            }
        });
        
        const response = await newMoveset(movesetData);
        $(`#moveBox${boxNumber}`).popover('dispose');
        $(`#moveBox${boxNumber}`).popover({
            content: response.msg,
            placement: "left",
            animation: true,
            trigger: "manual"
        });
        $(`#moveBox${boxNumber}`).popover('show');
        setTimeout(() => {
            $(`#moveBox${boxNumber}`).popover('hide');
        }, 3000);
    }
}

const saveMove = (move, moveboxID, movesets, listIndex)=>{
    const movesetIndex = moveboxID.charAt(7);
    const moveIndex = moveboxID.charAt(12)-1;
    let movePresent = false;

    // check if move already exists in set
    movesets['moveset'+movesetIndex].forEach((moveInSet) =>{
        if (move.name === moveInSet.name){
            movePresent = true;
        }
    });

    // if the move deosn't exist in the set then it is saved to the moveset object
    // and appended to the DOM
    if (!movePresent){
        movesets['moveset'+movesetIndex][moveIndex] = move;
        renderSavedMove(move, moveboxID, listIndex);
    }
    else{
        const presentMove = moveboxID.slice(0,8);
        $(`#${presentMove}`).popover('dispose');
        $(`#${presentMove}`).popover({
            content: "Move is already in set!",
            placement: "left",
            animation: true,
            trigger: "manual"
        });
        $(`#${presentMove}`).popover('show');
        setTimeout(() => {
            $(`#${presentMove}`).popover('hide');
        }, 2000);
    }
}

const renderSavedMove = (move, moveboxID, listIndex)=>{
    $(`#${moveboxID}`).html('');
    $(`#${moveboxID}`).append(/*template*/`
        <span class="moveset-box-move-title">${move.name.replace(/-/g," ")}</span>
        <span class="moveset-box-move-type pokemon-type-${move.type}">${move.type}</span>
        <span class="moveset-box-move-type move-category-${move.category}">${move.category}</span>
    `);
    $(`#${moveboxID}`).tooltip('dispose');
    $(`#${moveboxID}`).removeAttr('data-toggle data-html data-placement title');
    $(`#${moveboxID}`).attr(`index`,`${listIndex}`);
    $(`#${moveboxID}`).attr({
        "data-toggle": "tooltip",
        "data-html": "true",
        "data-placement": "left",
        title: /*template*/`
            <div><b>PWR:</b> ${move.power}</div>
            <div><b>ACC:</b> ${move.accuracy}</div>
            <div><b>PP:</b> ${move.pp}</div>
            <div>${move.description}</div>
        ` 
    });
    $(`#${moveboxID}`).tooltip({
        delay: {"show": 500}
    });
    $(`#${moveboxID}`).draggable({
        helper: function(e){
            return $(
                `<div class="move-helper">
                    <span class="move-title">${move.name.replace(/-/g," ")}</span>
                </div>`
            );
        },
        scroll: false,
        revert: 'invalid',
        cursorAt: {bottom: 0, left: 100},
        zIndex: 1
    });
}

const movesetsBox = (pokemon)=>{
    const movesets = {
        moveset1: [{},{},{},{}],
        moveset2: [{},{},{},{}],
        moveset3: [{},{},{},{}]
    }

    renderSaveList(pokemon, movesets);
}

export default movesetsBox;