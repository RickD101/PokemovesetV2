import page from "//unpkg.com/page/page.mjs";
import deleteUser from "../../api/user/deleteUser.js";

// renders a modal to the DOM prompting the user to confirm their intention to delete their profile
const confirmDeleteModal = async ()=>{
    $('#confirmDeleteModal').remove();
    $('body').append(/*template*/`
        <div class="modal fade" id="confirmDeleteModal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Are you sure?</h5>
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Your profile and all associated information (such as movesets) will be permanently deleted.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-danger" id="confirmDeleteButton">Delete profile</button>
                    </div>
                </div>
            </div>
        </div>
    `);

    // add event listener for the delete button within the modal
    $('#confirmDeleteButton').off();
    $('#confirmDeleteButton').on('click', async (event)=>{
        event.preventDefault();

        // make backend API call to delete user profile then hide the modal and redirect to the search page
        await deleteUser();
        $('#confirmDeleteModal').modal('hide');
        page.redirect('/search');
    })
}

export default confirmDeleteModal;