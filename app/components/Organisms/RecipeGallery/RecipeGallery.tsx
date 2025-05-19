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
  const [activeTag, setActiveTag] = useState("all");
  const [filteredRecipes, setFilteredRecipes] = useState<any[] | []>(recipes);

  const getTags = async () => {
    const response = await getAllTags();
    if (response) setTags(response);
  };

  useEffect(() => {
    getTags();
  }, []);

  const handleFilter = (tagName: string) => {
    const filteredItems = recipes.filter((item) =>
      item.tags?.length ? item.tags[0].tagName === tagName : recipes
    );
    setFilteredRecipes(filteredItems);
  };

  return (
    <div className={styles.TagGalleryContainer}>
      {recipes.length === 0 ? (
        "Nothing to show"
      ) : (
        <>
          <section className={styles.filterBtnsContainer}>
            <Tag
              isActive={activeTag === "all" ? true : false}
              label="All"
              onclick={() => {
                setFilteredRecipes(recipes);
                setActiveTag("all");
              }}
            />
            {tags.length > 0
              ? tags.map((tag) => (
                  <Tag
                    key={tag._id}
                    label={tag.tagName}
                    onclick={() => {
                      setActiveTag(tag.tagName);
                      handleFilter(tag.tagName);
                    }}
                    isActive={activeTag === tag.tagName ? true : false}
                  />
                ))
              : null}
          </section>
          <section className={styles.galleryContainer}>
            {filteredRecipes &&
              filteredRecipes.map((recipe: Recipe, index: number) => (
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
          </section>
        </>
      )}
    </div>
  );
};

export default RecipeGallery;
