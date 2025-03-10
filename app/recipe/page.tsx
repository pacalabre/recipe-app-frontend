"use client";
import { useEffect, useState } from "react";
import { getRecipe, updateRecipe } from "../services/recipe-service";
import { useSearchParams } from "next/navigation";
import { useUser } from "../contextApi/UserProvider";
import Link from "next/link";
import { Recipe } from "../types/recipeTypes";
import Input from "../components/Molecules/Input/Input";
import TextArea from "../components/Molecules/TextArea/TextArea";
import { useForm, SubmitHandler } from "react-hook-form";
import { Tag } from "../types/tagTypes";
import styles from "./recipePage.module.css";
import Button from "../components/Atoms/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faUser } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

type RecipeInputs = {
  recipeName: string;
  subtitle: string;
  description: string;
  ingredients: string;
  recipeDifficulty: string;
  totaltime: string;
  recipeInstructions: string;
};

const RecipePage = () => {
  const searchParams = useSearchParams();
  const recipeId = searchParams.get("id");
  const { user } = useUser();
  const [isSavedTextVisible, setIsSavedTextVisible] = useState(false);
  const [recipe, setRecipe] = useState<Recipe>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RecipeInputs>();

  const callGetRecipe = async () => {
    if (recipeId) {
      const response = await getRecipe(recipeId);
      setValue("recipeName", response.recipeName);
      setValue("subtitle", response.subtitle);
      setValue("description", response.description);
      setValue("ingredients", response.ingredients);
      setValue("recipeDifficulty", response.recipeDifficulty);
      setValue("totaltime", response.totalMakeTime);
      setValue("recipeInstructions", response.recipeInstructions);
      setRecipe(response);
    }
  };

  const onSubmit: SubmitHandler<RecipeInputs> = async (data) => {
    const updatedRecipe = {
      _id: recipe?._id,
      recipeName: data.recipeName,
      subtitle: data.subtitle,
      author: user.id,
      recipeDifficulty: data.recipeDifficulty,
      totalMakeTime: data.totaltime,
      ingredients: data.ingredients,
      description: data.description,
      recipeInstructions: data.recipeInstructions,
    };
    const response = await updateRecipe(updatedRecipe);
    if (response?.status === 200) {
      setIsEditing(false);
      callGetRecipe();
    }
  };

  useEffect(() => {
    callGetRecipe();
  }, []);

  const addFavorite = async (recipe: Recipe, userId: string) => {
    let updatedRecipe = { ...recipe };
    if (!userId) return;
    if (updatedRecipe?.favorites?.includes(userId)) {
      const indexOfFavorite = updatedRecipe.favorites.indexOf(userId);
      updatedRecipe.favorites.splice(indexOfFavorite, 1);
    } else {
      updatedRecipe.favorites?.push(userId);
    }
    setRecipe(updatedRecipe);
    favoriteTextDisplay();
    await updateRecipe(recipe);
  };

  function favoriteTextDisplay() {
    if (isSavedTextVisible) return;
    setIsSavedTextVisible(true);

    const timer = setTimeout(() => {
      setIsSavedTextVisible(false);
    }, 1000);

    return () => clearTimeout(timer); // Clear timeout if component unmounts
  }

  return (
    <main className={styles.recipeContainer}>
      <nav>
        <p className={styles.breadcrumbs}>
          <Link href="/allrecipes">Recipes</Link>{" "}
          <FontAwesomeIcon icon={faChevronRight} />
          <span className={styles.currentRecipe}>{recipe?.recipeName}</span>
        </p>
      </nav>
      <article className={styles.recipeArticle}>
        <section
          className={styles.imageContainer}
          style={{ backgroundImage: `url(${recipe?.image})` }}
        ></section>
        <section className={styles.recipeDetails}>
          <div className={styles.recipeTitleBtnContainer}>
            <h2>{recipe?.recipeName}</h2>
            <div className={styles.favoriteEditBtnsContainer}>
              <button
                className={styles.favoriteBtn}
                onClick={() => recipe && addFavorite(recipe, user?.id)}
              >
                <p className={styles.favoriteText}>
                  {isSavedTextVisible ? (
                    <span className={styles.favoriteTextFade}>
                      {recipe?.favorites?.includes(user?.id)
                        ? "saved"
                        : "not saved"}
                    </span>
                  ) : null}
                </p>
                <FontAwesomeIcon
                  icon={faHeart}
                  className={`${styles.favoriteBtnIcon} ${recipe?.favorites?.includes(user?.id) ? styles.active : ""}`}
                ></FontAwesomeIcon>
              </button>
              {user?.id === recipe?.author._id ? (
                <Button
                  onclick={() => setIsEditing(!isEditing)}
                  label="edit"
                  varient="secondary"
                  className={styles.editBtn}
                ></Button>
              ) : null}
            </div>
          </div>
          {isEditing ? (
            <form
              className={styles.editRecipeForm}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                label="recipe name"
                register={register}
                inputType="text"
                formField="recipeName"
                rules={{ required: "Recipe name is required" }}
                errorMsg={errors.recipeName?.message}
              />
              <Input
                label="subtitle"
                register={register}
                inputType="text"
                formField="subtitle"
              />

              <Input
                label="description"
                register={register}
                inputType="text"
                formField="description"
                rules={{ required: "Description is required" }}
                errorMsg={errors.description?.message}
              />
              <Input
                label="ingredients"
                register={register}
                inputType="text"
                formField="ingredients"
                rules={{ required: "Ingredients are required" }}
                errorMsg={errors.ingredients?.message}
              />
              <Input
                label="recipe difficulty"
                register={register}
                inputType="text"
                formField="recipeDifficulty"
                rules={{ required: "Recipe difficulty is required" }}
                errorMsg={errors.recipeDifficulty?.message}
              />
              <Input
                label="total time"
                register={register}
                inputType="text"
                formField="totaltime"
              />
              <label>Instructions:</label>
              <TextArea
                register={register}
                formField="recipeInstructions"
                rules={{ required: "Instructions are required" }}
              />
              {errors.recipeInstructions && (
                <p>{errors.recipeInstructions.message}</p>
              )}
              <Button
                className={styles.updateRecipeBtn}
                type="submit"
                varient="primary"
                label="update recipe"
              ></Button>
            </form>
          ) : (
            <>
              <div className={styles.recipeStats}>
                <div>
                  <p>Difficulty: {recipe?.recipeDifficulty}</p>
                  <p>Cooking Time: {recipe?.totalMakeTime}</p>
                  <p>Ingredients: {recipe?.ingredients}</p>
                </div>
                <div className={styles.userIconNameContainer}>
                  <FontAwesomeIcon
                    icon={faUser}
                    className={styles.userIcon}
                  ></FontAwesomeIcon>
                  <p className={styles.userName}>{recipe?.author.name}</p>
                </div>
              </div>
              <h4 className={styles.subheading}>{recipe?.subtitle}</h4>
              <p>{recipe?.recipeInstructions}</p>
              <p className={styles.recipeTags}>
                <span className={styles.recipeTagsLabel}>tags:</span>
                {recipe?.tags?.map((tag: Tag) => <>{tag.tagName}</>)}
              </p>
            </>
          )}
        </section>
      </article>
    </main>
  );
};

export default RecipePage;
