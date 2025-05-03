import AddTagsForm from "../../Organisms/AddTagsForm/add-tags-form";
import DeleteRecipes from "../../Organisms/DeleteRecipes/DeleteRecipes";
import EditUsersForm from "../../Organisms/EditUsersForm/edit-users-form";

const AdminDash = () => {
  return (
    <>
      <h2>Admin Dash</h2>
      <AddTagsForm />
      <EditUsersForm />
      <DeleteRecipes />
    </>
  );
};

export default AdminDash;
