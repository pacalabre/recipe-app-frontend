import { deleteRecipe, getAllRecipes } from "@/app/services/recipe-service";
import { Recipe } from "@/app/types/recipeTypes";
import { useEffect, useState } from "react";
import ProfileRecipeLink from "../../Molecules/ProfileRecipeLink/profile-recipe-link";
import { Backdrop, Box, Fade, Modal } from "@mui/material";
import Button from "../../Atoms/Button/Button";
import styles from "./deleteRecipe.module.css";

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

const DeleteRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>();
  const [recipeToDelete, setRecipeToDelete] = useState<Recipe>();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteRecipeFromModal = async () => {
    if (recipeToDelete)
      try {
        const response = await deleteRecipe(recipeToDelete);
        if (response?.status === 200) {
          getRecipeList();
        }
        handleClose();
      } catch (error) {
        console.log(`There was an error: ${error}`);
      }
  };

  const getRecipeList = async () => {
    const response = await getAllRecipes();
    setRecipes(response);
  };

  useEffect(() => {
    getRecipeList();
  }, []);
  return (
    <section>
      <h3>Delete Recipes </h3>
      {recipes?.map((recipe: Recipe, index) => (
        <ProfileRecipeLink
          key={index}
          recipe={recipe}
          triggerDeleteModal={handleOpen}
          setRecipeToDelete={setRecipeToDelete}
        />
      ))}
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
    </section>
  );
};

export default DeleteRecipes;
