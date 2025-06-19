import { Recipe } from "@/app/types/recipeTypes";
import { truncateString } from "@/app/utilityFunctions/truncateString";
import { faClock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styles from "./RecipeThemeCard.module.css";

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
        <img
          className={styles.image}
          src={recipe.image}
          alt={recipe.recipeName}
        />
        <div className={styles.recipeDetails}>
          <p className={styles.recipeName}>
            {recipe.recipeName && truncateString(recipe.recipeName, 40)}
          </p>
          <div className={styles.recipeIconTextContainer}>
            <div className={styles.recipeStatsContainer}>
              <div>
                <FontAwesomeIcon
                  icon={faClock}
                  className={styles.recipeIcon}
                ></FontAwesomeIcon>
                <span>
                  {recipe.totalMakeTime &&
                    truncateString(recipe.totalMakeTime, 10)}
                </span>
              </div>
            </div>
            <div className={styles.recipeStatsContainer}>
              <div>
                <FontAwesomeIcon
                  icon={faUser}
                  className={styles.recipeIcon}
                ></FontAwesomeIcon>
                <span>{recipe.author.name}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecipeThemeCard;
