// pagejs - Tiny Express-inspired client-side router.
import page from "//unpkg.com/page/page.mjs";
page.configure({window:window});

// inclusions
import navbar from "./components/navbar/navbar.js";
import searchBar from "./components/pokeAPI/searchBar.js";

// page routes function
const showPages = ()=>{

    page('/', ()=>{
        page.redirect('/search');
    });

    page('/search', navbar, searchBar);

    page({hashbang: true});
}

// jQuery on ready
$(()=>{
    showPages();
});