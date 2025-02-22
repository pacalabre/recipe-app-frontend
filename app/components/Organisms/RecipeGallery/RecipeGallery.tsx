import Link from "next/link";
import styles from "./RecipeGallery.module.css";
import { Recipe } from "@/app/types/recipeTypes";
import Tag from "../../Atoms/Tag/Tag";
import { getAllTags } from "@/app/services/tag-service";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faGaugeHigh,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

type RecipeGalleryProps = {
  recipes: Recipe[];
};
const RecipeGallery = ({ recipes }: RecipeGalleryProps) => {
  const [tags, setTags] = useState<any[] | []>([]);
  const [activeTag, setActiveTag] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState<any[] | []>(recipes);

  const getTags = async () => {
    const response = await getAllTags();
    if (response) setTags(response);
  };

  useEffect(() => {
    getTags();
  }, []);

  const handleFilter = (tagId: string) => {
    const filteredItems = recipes.filter((item) =>
      item.tags?.length ? item.tags[0]._id === tagId : recipes
    );
    setFilteredRecipes(filteredItems);
  };

  return (
    <section>
      <Tag
        isActive={false}
        label="All"
        onclick={() => setFilteredRecipes(recipes)}
      />
      {tags.length > 0 ? (
        tags.map((tag) => (
          <Tag
            key={tag._id}
            label={tag.tagName}
            onclick={() => {
              setActiveTag(tag._id);
              handleFilter(tag._id);
            }}
            isActive={activeTag === tag._id ? true : false}
          />
        ))
      ) : (
        <p>No tags</p>
      )}
      <div className={styles.galleryContainer}>
        {filteredRecipes.map((recipe: Recipe, index: number) => (
          <div key={index} className={styles.galleryItem}>
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
                <p className={styles.recipeName}>{recipe.recipeName}</p>
                <div className={styles.recipeIconTextContainer}>
                  <div className={styles.recipeStatsContainer}>
                    <div>
                      <FontAwesomeIcon
                        icon={faClock}
                        className={styles.recipeIcon}
                      ></FontAwesomeIcon>
                      <span>{recipe.totalMakeTime}</span>
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
        ))}
      </div>
    </section>
  );
};

export default RecipeGallery;
