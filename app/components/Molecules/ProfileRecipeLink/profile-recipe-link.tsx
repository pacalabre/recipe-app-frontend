import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styles from "./profileRecipeLink.module.css";
import { Recipe } from "@/app/types/recipeTypes";
import { Dispatch, SetStateAction } from "react";
import { useUser } from "@/app/contextApi/UserProvider";

type Props = {
  recipe: Recipe;
  triggerDeleteModal: () => void;
  setRecipeToDelete: Dispatch<SetStateAction<Recipe | undefined>>;
};

const ProfileRecipeLink: React.FC<Props> = ({
  recipe,
  triggerDeleteModal,
  setRecipeToDelete,
}) => {
  const { user } = useUser();
  return (
    <div className={styles.userRecipe}>
      <Link
        className={styles.recipeLink}
        href={{
          pathname: "/recipe",
          query: { id: recipe._id },
        }}
      >
        <div
          style={{
            backgroundImage: `url(${recipe?.image})`,
          }}
          className={styles.recipeImage}
        ></div>
        <div className={styles.recipeDetails}>
          <div className={styles.recipeTitleDescription}>
            <h4 className={styles.recipeTitle}>{recipe.recipeName}</h4>
            <p className={styles.recipeDescription}>{recipe.description}</p>
          </div>
          <div className={styles.difficultyTotalMakeTime}></div>
        </div>
      </Link>
      {user?.id === recipe?.author._id || user?.isAdmin ? (
        <button
          className={styles.deleteRecipeButton}
          onClick={() => {
            triggerDeleteModal();
            setRecipeToDelete(recipe);
          }}
        >
          <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
        </button>
      ) : null}
    </div>
  );
};

export default ProfileRecipeLink;
