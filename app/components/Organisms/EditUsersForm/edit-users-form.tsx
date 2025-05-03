import { editUsers } from "@/app/services/user-service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "../../Atoms/Button/Button";
import { getUsers } from "@/app/services/user-service";
import { useEffect, useState } from "react";
import { User } from "@/app/types/userTypes";
import styles from "./editUsersForm.module.css";
import Snackbar from "@mui/material/Snackbar/Snackbar";

const EditUsersForm = () => {
  const [users, setUsers] = useState<User[] | []>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClick = async () => {
    setOpenSnackbar(true);
  };

  const callGetUsers = async () => {
    const response = await getUsers();
    if (response) {
      setUsers(response);
    }
  };

  useEffect(() => {
    callGetUsers();
  }, []);

  return (
    <>
      <h3>Edits Users</h3>
      <div className={styles.editUsersFormContainer}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Users</TableCell>
                <TableCell align="right">Admin</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user: User, index) => (
                <TableRow
                  key={user._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.name}
                  </TableCell>
                  <TableCell align="right">
                    <input
                      type="checkbox"
                      checked={user.isAdmin}
                      onClick={() => {
                        const copyOfUsers: User[] = [...users];
                        const userToUpdate = copyOfUsers[index];
                        userToUpdate.isAdmin = !userToUpdate.isAdmin;
                        setUsers(copyOfUsers);
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      className={styles.saveChanges}
                      label="Save"
                      varient="secondary"
                      onclick={async () => {
                        const copyOfUsers: User[] = [...users];
                        const userToUpdate = copyOfUsers[index];
                        try {
                          const response = await editUsers(userToUpdate);
                          if (response) setOpenSnackbar(true);
                        } catch (error) {
                          console.log(
                            `There was an error updating the user:${error}`
                          );
                        }
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        message="User has been saved"
      />
    </>
  );
};

export default EditUsersForm;

// create edit users service
// list all users out
// create a checkbox to give and remove admin status
// create a button for each user that updates the user when clicked
// when successful - maybe display a toast saying so
