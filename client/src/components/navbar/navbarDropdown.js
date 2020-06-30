import getUserStatus from "../../api/user/getUserStatus.js";
import userLogin from "../../api/user/userLogin.js";
import userLogout from "../../api/user/userLogout.js";
import signupModal from "./signupModal.js";
import confirmDeleteModal from "./confirmDeleteModal.js";

const attemptLogin = async (formData)=>{
    const login = await userLogin(formData);
    if (login.status){
        appendProfile();
    }
    else if (!login.status){
        $('.alert').remove();
        $('#loginButton').after(/*template*/`
            <div class="alert alert-danger" role="alert">
                ${login.msg}
            </div>
        `);
    }
}

const appendLogin = ()=>{
    $('#loginDropButton').text('Login');
    $('.dropdown-menu').html(/*template*/`
        <form id="login-form" class="px-4 py-3">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" class="form-control" id="username" placeholder="Username" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" placeholder="Password" required>
            </div>
            <button type="submit" class="btn btn-primary" id="loginButton">Sign in</button>
        </form>
        <div class="dropdown-divider"></div>
        <button class="dropdown-item" data-toggle="modal" data-target="#signupModal" id="signupLink">
            New around here? Sign up
        </button>
    `);

    $('#navbarDropdown').off();
    $('#navbarDropdown').on('show.bs.dropdown', ()=>{
        $('.alert').remove();
        $('#username').val('');
        $('#password').val('');
    });

    signupModal();

    $('#login-form').off();
    $('#login-form').on('submit', (event)=>{
        event.preventDefault();

        const formData = {
            username: $('#username').val(),
            password: $('#password').val()
        };

        attemptLogin(formData);
    });
}

const appendProfile = async ()=>{
    const userLoggedIn = await getUserStatus();
    $('#loginDropButton').text('Profile');
    $('.dropdown-menu').html(/*template*/`
        <span class="dropdown-item dropdown-profile-title">
            ${userLoggedIn.username}'s Profile
        </span>
        <div class="dropdown-divider"></div>
        <div class="profileButtonContainer">
            <a class="btn btn-primary profileButton" href="#" role="button">View movesets</a>
            <button type="button" class="btn btn-secondary profileButton" id="logout">Logout</button>
            <button type="button" class="btn btn-danger profileButton" data-toggle="modal" data-target="#confirmDeleteModal">Delete profile</button>
        </div>
    `);

    confirmDeleteModal();

    $('#logout').off();
    $('#logout').on('click', async (event)=>{
        event.preventDefault();

        await userLogout();
        appendLogin();
    });
}

const navbarDropdown = async ()=>{
    const userLoggedIn = await getUserStatus();
    if (userLoggedIn.status){
        appendProfile();
    }
    else if (!userLoggedIn.status){
        appendLogin();
    }
}

export default navbarDropdown;