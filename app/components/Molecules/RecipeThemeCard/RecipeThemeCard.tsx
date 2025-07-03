import { Recipe } from "@/app/types/recipeTypes";
import { truncateString } from "@/app/utilityFunctions/truncateString";
import { faClock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styles from "./RecipeThemeCard.module.css";
import { recipeImageBasedOnTag } from "@/app/utilityFunctions/recipeImageBasedOnTag";

type Props = {
  recipe: Recipe;
  index: number;
};

const RecipeThemeCard = ({ recipe, index }: Props) => {
  return (
    <div className={styles.galleryItem}>
      <Link
        className={styles.recipeLink}
        href={{
          pathname: "/recipe",
          query: { id: recipe._id },
        }}
      >
        <div
          className={styles.imgContainer}
          style={recipeImageBasedOnTag(
            recipe.tags?.length ? recipe.tags[0].tagName : ""
          )}
        ></div>
        <div className={styles.recipeDetails}>
          <p className={styles.recipeName}>
            {recipe.recipeName && truncateString(recipe.recipeName, 40)}
          </p>
          <div className={styles.recipeIconTextContainer}>
            <div className={styles.recipeStatsContainer}>
              <div className={styles.userIconNameContainer}>
                <FontAwesomeIcon
                  icon={faUser}
                  className={styles.recipeIcon}
                ></FontAwesomeIcon>
                <span>{recipe.author.name}</span>
              </div>
            </div>
            <div className={styles.recipeStatsContainer}>
              <p className={styles.difficulty}>
                Difficulty: {recipe.recipeDifficulty}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecipeThemeCard;
