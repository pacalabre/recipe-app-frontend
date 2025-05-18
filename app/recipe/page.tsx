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
import Loader from "../components/Atoms/Loader/Loader";

type RecipeInputs = {
  recipeName: string;
  image: string;
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
      setValue("image", response.image);
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
      image: data.image,
      recipeName: data.recipeName,
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
    await updateRecipe(recipe);
  };

  return (
    <main className={styles.recipeContainer}>
      {recipe ? (
        <>
          <nav>
            <p className={styles.breadcrumbs}>
              <Link href="/allrecipes">Recipes</Link>{" "}
              <FontAwesomeIcon icon={faChevronRight} />
              <span className={styles.currentRecipe}>{recipe?.recipeName}</span>
            </p>
          </nav>
          <article className={styles.recipeArticle}>
            <section className={styles.recipeHero}>
              <div
                className={styles.imageContainer}
                style={{ backgroundImage: `url(${recipe?.image})` }}
              ></div>
              <div className={styles.recipeTitleAuthorContainer}>
                <h2 className={styles.recipeTitle}>{recipe?.recipeName}</h2>
                <h4 className={styles.subheading}>{recipe?.description}</h4>
                <div className={styles.userIconNameContainer}>
                  <FontAwesomeIcon
                    icon={faUser}
                    className={styles.userIcon}
                  ></FontAwesomeIcon>
                  <p className={styles.userName}>{recipe?.author.name}</p>
                </div>
                <button
                  className={styles.favoriteBtn}
                  onClick={() => recipe && addFavorite(recipe, user?.id)}
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    className={`${styles.favoriteBtnIcon} ${recipe?.favorites?.includes(user?.id) ? styles.active : ""}`}
                  ></FontAwesomeIcon>
                  <p className={styles.favoriteText}>
                    <span className={styles.favoriteTextFade}>
                      {recipe?.favorites?.includes(user?.id)
                        ? "saved"
                        : "not saved"}
                    </span>
                  </p>
                </button>
              </div>
            </section>
            <section className={styles.recipeDetails}>
              <div className={styles.recipeTitleBtnContainer}></div>
              {user?.id === recipe?.author._id ? (
                <Button
                  onclick={() => setIsEditing(!isEditing)}
                  label="edit"
                  varient="secondary"
                  className={styles.editBtn}
                ></Button>
              ) : null}
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
                    rules={{
                      required: "Recipe name is required",
                      maxLength: {
                        value: 150,
                        message:
                          "Recipe name can not be longer than 150 characters long",
                      },
                    }}
                    errorMsg={errors.recipeName?.message}
                  />
                  <Input
                    label="description"
                    register={register}
                    inputType="text"
                    formField="description"
                    rules={{
                      maxLength: {
                        value: 250,
                        message:
                          "Recipe description can not be longer than 250 characters long",
                      },
                    }}
                    errorMsg={errors.description?.message}
                  />
                  <Input
                    label="ingredients"
                    register={register}
                    inputType="text"
                    formField="ingredients"
                    rules={{
                      required: "Ingredients are required",
                      maxLength: {
                        value: 1000,
                        message:
                          "Recipe ingredients can not be longer than 1000 characters long",
                      },
                    }}
                    errorMsg={errors.ingredients?.message}
                  />
                  <Input
                    label="recipe difficulty"
                    register={register}
                    inputType="text"
                    formField="recipeDifficulty"
                    rules={{
                      required: "Recipe difficulty is required",
                      min: {
                        value: 1,
                        message: "Recipe difficulty must be at least 1",
                      },
                      max: {
                        value: 5,
                        message: "Recipe difficulty can not be over 5",
                      },
                    }}
                    errorMsg={errors.recipeDifficulty?.message}
                  />
                  <Input
                    label="total time"
                    register={register}
                    inputType="text"
                    formField="totaltime"
                    rules={{
                      required: "Make time is required",
                      maxLength: {
                        value: 500,
                        message:
                          "Recipe make time can not be longer than 500 characters long",
                      },
                    }}
                    errorMsg={errors.totaltime?.message}
                  />
                  <label>Instructions:</label>
                  <TextArea
                    register={register}
                    formField="recipeInstructions"
                    rules={{ required: "Instructions are required" }}
                    errorMsg={errors.recipeInstructions?.message}
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
                  </div>

                  <p>{recipe?.recipeInstructions}</p>
                  <p className={styles.recipeTags}>
                    <span className={styles.recipeTagsLabel}>tags:</span>
                    {recipe?.tags?.map((tag: Tag) => <>{tag.tagName}</>)}
                  </p>
                </>
              )}
            </section>
          </article>
        </>
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default RecipePage;
