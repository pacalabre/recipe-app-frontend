import Link from "next/link";
import styles from "./RecipeGallery.module.css";
import { Recipe } from "@/app/types/recipeTypes";

type RecipeGalleryProps = {
  recipes: Recipe[];
};
const RecipeGallery = ({ recipes }: RecipeGalleryProps) => {
  return (
    <section className={styles.galleryContainer}>
      {recipes.map((recipe: Recipe, index: number) => (
        <div key={index} className={styles.galleryItem}>
          <Link
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
          </Link>
        </div>
      ))}
    </section>
  );
};

export default RecipeGallery;
