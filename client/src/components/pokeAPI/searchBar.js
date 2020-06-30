const searchBar = ()=>{
    // first empty the container of all elements
    $('.container').children().remove();

    // draw the pokemon search bar and button
    $('.container').append(/*template*/`
        <div class="form-row d-flex align-content-center justify-content-center" id="searchForm" style="height: 100vh;">
            <div class="col-12 col-sm-6 p-1">
                <input class="form-control form-control-lg" id="searchBar" type="text" placeholder="Search Pokémon...">
            </div>
            <div class="p-1">
                <select class="form-control form-control-lg" id="genSelect">
                    <option>Generation 1</option>
                    <option>Generation 2</option>
                    <option>Generation 3</option>
                    <option>Generation 4</option>
                    <option>Generation 5</option>
                    <option>Generation 6</option>
                    <option>Generation 7</option>
                </select>
            </div>
            <div class="p-1">
                <button class="btn btn-primary btn-lg" id="searchButton">Go!</button>
            </div>
        </div>
    `);
    
    // add the event listeners for Go button and enter key
    $('#searchForm').off();
    $('#searchForm').on('click',()=>{
        console.log('search',$('#searchBar').val(),$('#genSelect').val());
    });

    $('#searchForm').unbind('keypress');
    $('#searchForm').keypress((event) =>{
        if (event.which == 13){
            console.log('search',$('#searchBar').val(),$('#genSelect').val());
        }
    });
}

export default searchBar;