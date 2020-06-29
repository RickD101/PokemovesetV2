import navbarDropdown from "./navbarDropdown.js";

const navbar = (ctx, next)=>{
    $('.fixed-top').append(/*template*/`
        <nav class="navbar navbar-expand-lg navbar-light bg-danger">
            <a class="navbar-brand" href="index.html">Pokémoveset</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav w-100">
                    <li>
                        <span class="navbar-text align-left text-light">
                            <i>The Pokémon moveset generator.</i>
                        </span>
                    </li>
                    <li class="dropdown ml-auto">
                        <div class="btn-group">
                            <div class="dropdown">
                                <button class="btn btn-light dropdown-toggle" type="button" id="loginDropButton" data-toggle="dropdown">

                                </button>
                                <div class="dropdown-menu dropdown-menu-right">
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    `);

    navbarDropdown();

    next();
}

export default navbar;