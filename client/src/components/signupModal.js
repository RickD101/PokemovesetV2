import newUser from "../api/user/newUser.js";

const attemptSignup = async (formData)=>{
    if (formData.password1 === formData.password2){
        const signup = await newUser({
            username: formData.username,
            password: formData.password1
        });
        if (signup.status){
            $('.alert').remove();
            $('#signupButton').after(/*template*/`
                <div class="alert alert-success" role="alert">
                    ${signup.msg} You may now log in above.
                </div>
            `);
            $('#signupUsername').val('');
            $('#signupPassword1').val('');
            $('#signupPassword2').val('');
        }
        else if (!signup.status){
            $('.alert').remove();
            $('#signupButton').after(/*template*/`
                <div class="alert alert-danger" role="alert">
                    ${signup.msg}
                </div>
            `);
        }
    }
    else if (formData.password1 !== formData.password2){
        $('.alert').remove();
        $('#signupButton').after(/*template*/`
            <div class="alert alert-danger" role="alert">
                Passwords do not match.
            </div>
        `);
    }
}

const signupModal = ()=>{
    $('#signupModal').remove();
    $('body').append(/*template*/`
    <div class="modal fade" id="signupModal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Sign up below!</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="signup-form">
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input type="text" class="form-control" id="signupUsername" placeholder="Username" required>
                        </div>
                        <div class="form-group">
                            <label for="password1">Password</label>
                            <input type="password" class="form-control" id="signupPassword1" placeholder="Password" required>
                            <small class="form-text text-muted">Password must contain at least 8 characters.</small>
                        </div>
                        <div class="form-group">
                            <label for="password">Confirm password</label>
                            <input type="password" class="form-control" id="signupPassword2" placeholder="Password" required>
                        </div>
                        <button type="submit" class="btn btn-primary" id="signupButton">Sign up</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    `);

    $('#signup-form').off();
    $('#signup-form').on('submit', (event)=>{
        event.preventDefault();

        const formData = {
            username: $('#signupUsername').val(),
            password1: $('#signupPassword1').val(),
            password2: $('#signupPassword2').val()
        };

        attemptSignup(formData);
    });

    $('#signupModal').on('hidden.bs.modal', ()=>{
        $('.alert').remove();
        $('#signupUsername').val('');
        $('#signupPassword1').val('');
        $('#signupPassword2').val('');
    });
}

export default signupModal;