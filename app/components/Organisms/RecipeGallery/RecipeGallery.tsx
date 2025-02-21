import Link from "next/link";
import styles from "./RecipeGallery.module.css";
import { Recipe } from "@/app/types/recipeTypes";
import Tag from "../../Atoms/Tag/Tag";
import { getAllTags } from "@/app/services/tag-service";
import { useEffect, useState } from "react";

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
      </div>
    </section>
  );
};

export default RecipeGallery;
