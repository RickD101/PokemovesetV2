import searchPokemon from "../../api/pokeAPI/searchPokemon.js";
import { pokemonNames } from "../../consts.js";
import page from "//unpkg.com/page/page.mjs";

// calls the backend API to search for pokemon (via external API)
const attemptSearch = async (pokemonData)=>{
    
    // remove event listeners for search bar while search is being performed
    // to prevent multiple search submissions
    $('#searchForm').off();
    $('#searchForm').on('submit', (event)=>{event.preventDefault()});
    
    // call the backend API and render a loading spinner while waiting
    $('#searchBar').addClass('loadinggif');
    const search = await searchPokemon(pokemonData);
    $('#searchBar').removeClass('loadinggif');
    
    // if search is successful, save the returned pokemon data to session storage
    if (search.status){
        sessionStorage.setItem('pokemon', JSON.stringify(search.pokemon));
        page.redirect('/searchResults');
    }
    else if (!search.status){
        $('#searchBar').popover('dispose');
        $('#searchBar').popover({
            content: search.msg,
            placement: "bottom",
            animation: true,
            trigger: "manual"
        });
        $('#searchBar').popover('show');
        setTimeout(() => {
            $('#searchBar').popover('hide');
            $('#searchForm').on('submit', submitSearch);
        }, 3000);
    }
}

const submitSearch = (event)=>{
    event.preventDefault();
    
    const pokemonData = {
        name: $('#searchBar').val(),
        gen: $('#genSelect').val()
    };

    attemptSearch(pokemonData);
}

const searchBar = ()=>{
    // first empty the container of all elements
    $('#contentContainer').children().remove();

    // draw the pokemon search bar and button
    $('#contentContainer').append(/*template*/`
        <div class="d-flex align-items-center justify-content-center" style="height: 88vh;">
            <form id="searchForm" style="margin-top: -100px; text-align: center;">
                <h4>Enter a Pokémon by name or Pokédex number and select your desired generation.</h4>
                <div class="form-row d-flex justify-content-center">
                    <div class="m-1" style="width: 60%;">
                        <input type="text" class="form-control form-control-lg" placeholder="Search Pokémon..." id="searchBar" required>
                    </div>
                    <div class="m-1" style="width: 24%;">
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
                    <div class="m-1">
                        <button type="submit" class="btn btn-primary btn-lg" id="searchButton">Go!</button>
                    </div>
                </div>
            </form>
        </div>
    `);

    // add autocomplete fucntionality to searchbar
    $('#searchBar').autocomplete({
        maxShowItems: 5,
        source: pokemonNames
    });
    
    // add the event listeners for search form
    $('#searchForm').off();
    $('#searchForm').on('submit', submitSearch);
}

export default searchBar;