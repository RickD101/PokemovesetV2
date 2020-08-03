import getUserStatus from "../../api/user/getUserStatus.js";
import newMoveset from "../../api/moveset/newMoveset.js";

// renders the movesets panel on the right hand panel of the search results page to the DOM
const renderSaveList = (pokemon, movesets)=>{
    
    // define empty move message and Pokemon name formatting
    const emptyMessage = 'Drag and drop a move here...';
    let pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    pokemonName = pokemonName.replace(/-/g, " ");
    
    // render the basic structure of the moveset column
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

    // add event listener for the clear moveset button
    $('.movebox-delete').off();
    $('.movebox-delete').on('click', event=>{
        clearMoveset(event, pokemon, movesets, pokemonName, emptyMessage);
    });

    // add event listener for the save moveset button
    $('.movebox-save').off();
    $('.movebox-save').on('click', event=>{
        saveMoveset(event, pokemon, movesets);
    });

    // add droppable functionality for the move slots
    $('.moveset-box-move').droppable({
        drop: function (event,ui){
            const moveboxID = $(event.target).attr('id');
            const moveIndex = $(ui.draggable).attr('index');
            saveMove(pokemon.moves[moveIndex], moveboxID, movesets, moveIndex);
        }
    });
}

// clears the moveset when the associated button is clicked
const clearMoveset = (event, pokemon, movesets, pokemonName, emptyMessage)=>{
    
    // extract the box number from the id passed by the event object
    const boxNumber = event.target.id.charAt(6);
    
    // render blank moveset to the DOM
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
    
    // redefine the droppable functionality of the empty move boxes
    $(`#moveBox${boxNumber} .moveset-box-movebox .moveset-box-move`).droppable({
        drop: function (event,ui){
            const moveboxID = $(event.target).attr('id');
            const moveIndex = $(ui.draggable).attr('index');
            saveMove(pokemon.moves[moveIndex], moveboxID, movesets, moveIndex);
        }
    });
    
    // revert to default name for the moveset
    $(`#name${boxNumber}`).val(`${pokemonName} Moveset ${boxNumber}`);

    // clear the moveset object saved to memory
    movesets[`moveset${boxNumber}`] = [{},{},{},{}];
}

// saves moveset to backend when the associated button is clicked
const saveMoveset = async (event, pokemon, movesets)=>{
    
    // call backend to check if user is logged in
    const userLoggedIn = await getUserStatus();
    
    // associate the targeted object with the moveset saved to memory
    const boxNumber = event.target.id.charAt(4);
    const moveset = movesets[`moveset${boxNumber}`];
    
    // initially assume that moveset is empty
    let movesetEmpty = true;

    // loop through the moveset to check if moveset is occupied
    moveset.forEach(move => {
        if (move.name){
            movesetEmpty = false;
        }
    });

    // if no user is logged in, user is prompted to login to save moveset
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
    // if user is logged in but moveset is empty, user is notified
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
    // if user is logged in and moveset is occupied, the moveset is saved to the backend API
    else if (userLoggedIn.status){
        // define the blank moveset data object to be sent
        const movesetData = {moves:{}};

        // save the basic pokemon data to the object
        movesetData.name = $(`#name${boxNumber}`).val();
        movesetData.pokemon = {
            name: pokemon.name,
            spriteURL: pokemon.spriteURL,
            dexNumber: pokemon.info.dexNumber,
            type: pokemon.info.type,
            stats: pokemon.info.stats
        };
        movesetData.generation = pokemon.generation;

        // save each occupied move
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
        
        // call the backend API to save the moveset and display status message
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

// saves dragged and dropped move to the moveset object in memory
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
    // else user is prompted with a message that the move is already in the set
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

// renders a dragged and dropped move to the DOM
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

// renders the moveset box and applies associated functionality
const movesetsBox = (pokemon)=>{
    
    // define a blank moveset object in memory
    const movesets = {
        moveset1: [{},{},{},{}],
        moveset2: [{},{},{},{}],
        moveset3: [{},{},{},{}]
    }

    // call the function to render to DOM and apply functionality
    renderSaveList(pokemon, movesets);
}

export default movesetsBox;