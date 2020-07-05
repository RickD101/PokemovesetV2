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

    page('/', ()=>{
        page.redirect('/search');
    });

    page('/search', navbar, searchBar);

    page('/searchResults', navbar, searchResults);

    page('/movesets', navbar, browseMovesets);

    page({hashbang: true});
}

// jQuery on ready
$(()=>{
    showPages();
});