"use client";

import { useEffect, useState } from "react";
import { useUser } from "../contextApi/UserProvider";
import {
  getUserRecipes,
  getUserFavoriteRecipes,
} from "../services/user-service";
import { deleteRecipe } from "../services/recipe-service";
import styles from "./profile.module.css";
import { Recipe } from "../types/recipeTypes";
import Link from "next/link";
import Loader from "../components/Atoms/Loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Atoms/Button/Button";
import AdminDash from "../components/Templates/AdminDash/admin-dash";
import ProfileRecipeLink from "../components/Molecules/ProfileRecipeLink/profile-recipe-link";
import { Backdrop, Box, Fade, Modal } from "@mui/material";

const Profile = () => {
  const { user } = useUser();
  const [userRecipes, setUserRecipes] = useState<any>();
  const [userFavoriteRecipes, setUserFavoriteRecipes] = useState<any>();
  const [initials, setInitials] = useState<string>("");
  const [isAdminDashShowing, setIsAdminDashShowing] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState<Recipe>();
  const [open, setOpen] = useState(false);

  const callGetUserRecipes = async (id: string) => {
    if (id) {
      const response = await getUserRecipes(id);
      setUserRecipes(response);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const deleteRecipeFromModal = async () => {
    if (recipeToDelete)
      try {
        const response = await deleteRecipe(recipeToDelete);
        if (response?.status === 200) {
          callGetUserRecipes(user.id);
          callGetUserFavoriteRecipes(user.id);
        }
        handleClose();
      } catch (error) {
        console.log(`There was an error: ${error}`);
      }
  };

  const callGetUserFavoriteRecipes = async (id: string) => {
    if (id) {
      const response = await getUserFavoriteRecipes(id);
      setUserFavoriteRecipes(response);
    }
  };

  useEffect(() => {
    if (user) {
      callGetUserRecipes(user.id);
      callGetUserFavoriteRecipes(user.id);
    }
  }, [isAdminDashShowing]);

  useEffect(() => {
    if (user) {
      callGetUserRecipes(user.id);
      callGetUserFavoriteRecipes(user.id);
      setInitials(user.name.charAt(0));
    }
  }, [user]);

  return (
    <>
      {user ? (
        <main className={styles.profileCard}>
          <div className={styles.profileContentContainer}>
            <section className={styles.userDetails}>
              <div className={styles.userInitalContainer}>
                <p className={styles.userInital}>{initials}</p>
              </div>
              <div className={styles.userNameEmail}>
                <p>
                  Name:<span className={styles.userName}>{user?.name}</span>
                </p>
                <p>Email:{user?.email}</p>
                {user?.isAdmin && (
                  <p>
                    You are an Admin
                    <Button
                      label="View Admin Dash"
                      varient="tertiary"
                      onclick={() => setIsAdminDashShowing(!isAdminDashShowing)}
                    ></Button>
                  </p>
                )}
              </div>
            </section>
            {isAdminDashShowing ? (
              <AdminDash />
            ) : (
              <div className={styles.profileRecipesContainer}>
                <section className={styles.recipeList}>
                  <h3>Your Recipes:</h3>
                  {userRecipes?.length ? (
                    userRecipes?.map((recipe: Recipe, index: number) => (
                      <ProfileRecipeLink
                        key={index}
                        recipe={recipe}
                        setRecipeToDelete={setRecipeToDelete}
                        triggerDeleteModal={handleOpen}
                      />
                    ))
                  ) : (
                    <p>You haven't created any recipes yet.</p>
                  )}
                </section>
                <section className={styles.recipeList}>
                  <h3>Your Favorite Recipes:</h3>
                  {userFavoriteRecipes?.length ? (
                    userFavoriteRecipes?.map(
                      (recipe: Recipe, index: number) => (
                        <ProfileRecipeLink
                          key={index}
                          recipe={recipe}
                          setRecipeToDelete={setRecipeToDelete}
                          triggerDeleteModal={handleOpen}
                        />
                      )
                    )
                  ) : (
                    <p>You have no favorite recipes.</p>
                  )}
                </section>
              </div>
            )}
          </div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <h4>
                  Are you sure you want to delete: {recipeToDelete?.recipeName}?
                </h4>
                <div className={styles.modalButtonContainer}>
                  <Button
                    onclick={handleClose}
                    label="cancel"
                    varient="secondary"
                  />
                  <Button
                    onclick={deleteRecipeFromModal}
                    label="delete"
                    varient="primary"
                  />
                </div>
              </Box>
            </Fade>
          </Modal>
        </main>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Profile;
