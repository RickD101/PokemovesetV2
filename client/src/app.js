// pagejs - Tiny Express-inspired client-side router.
import page from "//unpkg.com/page/page.mjs";
page.configure({window:window});

// inclusions
import navbar from "./components/navbar.js";

// page routes function
const showPages = ()=>{

    page('/', ()=>{
        page.redirect('/search');
    });

    page('/search', navbar, ()=>{

    });

    page({hashbang: true});
}

// jQuery on ready
$(()=>{
    showPages();
});