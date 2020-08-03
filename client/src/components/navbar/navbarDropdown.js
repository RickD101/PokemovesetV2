import getUserStatus from "../../api/user/getUserStatus.js";
import userLogin from "../../api/user/userLogin.js";
import userLogout from "../../api/user/userLogout.js";
import signupModal from "./signupModal.js";
import confirmDeleteModal from "./confirmDeleteModal.js";
import page from "//unpkg.com/page/page.mjs";

// calls the backend API to attempt a user login
const attemptLogin = async (formData)=>{
    
    // call the backend API
    const login = await userLogin(formData);
    
    // if successful, the dropdown is re-rendered with the user profile buttons
    if (login.status){
        appendProfile(login.username);
    }
    // otherwise an alert is displayed with a message from the backend API
    else if (!login.status){
        $('.alert').remove();
        $('#loginButton').after(/*template*/`
            <div class="alert alert-danger" role="alert">
                <i class="fas fa-exclamation-circle"></i>
                ${login.msg}
            </div>
        `);
    }
}

// renders the login form structure to the navbar dropdown
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

    // clears the login form fields and previous alerts whenever the dropdown is shown
    $('#navbarDropdown').off();
    $('#navbarDropdown').on('show.bs.dropdown', ()=>{
        $('.alert').remove();
        $('#username').val('');
        $('#password').val('');
    });

    // renders a signup modal to be shown when the user presses the sign up  utton
    signupModal();

    // adds the event listener to the login form
    $('#login-form').off();
    $('#login-form').on('submit', (event)=>{
        event.preventDefault();

        const formData = {
            username: $('#username').val(),
            password: $('#password').val()
        };

        // make the backend API call to login
        attemptLogin(formData);
    });
}

// renders the user profile buttons to the dropdown
const appendProfile = (username)=>{
    $('#loginDropButton').text('Profile');
    $('.dropdown-menu').html(/*template*/`
        <span class="dropdown-item dropdown-profile-title">
            ${username}'s Profile
        </span>
        <div class="dropdown-divider"></div>
        <div class="profileButtonContainer">
            <a class="btn btn-primary profileButton" href="/movesets" role="button">View movesets</a>
            <button type="button" class="btn btn-secondary profileButton" id="logout">Logout</button>
            <button type="button" class="btn btn-danger profileButton" data-toggle="modal" data-target="#confirmDeleteModal">Delete profile</button>
        </div>
    `);

    // calls the delete profile confirmation modal activated by the delete profile button
    confirmDeleteModal();

    // adds logout event listener to the logout button
    $('#logout').off();
    $('#logout').on('click', async (event)=>{
        event.preventDefault();

        // call the backend API then render the login dropdown and redirect to home page
        await userLogout();
        appendLogin();
        page.redirect('/search');
    });
}


const navbarDropdown = async ()=>{
    // call the backend API to check user status
    const userLoggedIn = await getUserStatus();
    
    // if a user is logged in, render the profile buttons to the dropdown
    if (userLoggedIn.status){
        appendProfile(userLoggedIn.username);
    }
    // else render the login form to the dropdown
    else if (!userLoggedIn.status){
        appendLogin();
    }
}

export default navbarDropdown;