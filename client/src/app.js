// pagejs - Tiny Express-inspired client-side router.
import page from "//unpkg.com/page/page.mjs";
page.configure({window:window});

// inclusions
import navbar from "./components/navbar/navbar.js";
import searchBar from "./components/pokeAPI/searchBar.js";
import searchResults from "./components/pokeAPI/searchResults.js";
import browseMovesets from "./components/moveset/browseMovesets.js";

// page routes function
const showPages = ()=>{

    // redirect to search route from base directory
    page('/', ()=>{
        page.redirect('/search');
    });

    // search page route
    page('/search', navbar, searchBar);

    // search results route
    page('/searchResults', navbar, searchResults);

    // saved movesets route
    page('/movesets', navbar, browseMovesets);

    page({hashbang: true});
}

// jQuery on ready
$(()=>{
    showPages();
});