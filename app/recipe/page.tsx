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
import styles from "./recipePage.module.css";
import Button from "../components/Atoms/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faUser } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Loader from "../components/Atoms/Loader/Loader";
import Select from "../components/Atoms/Select/Select";
import FileUpload from "../components/Molecules/FileUpload/FileUpload";
import TagComponent from "../components/Atoms/Tag/Tag";
import { Tag } from "../types/tagTypes";
import { useRouter } from "next/navigation";
import { getAllTags } from "../services/tag-service";

type RecipeInputs = {
  recipeName: string;
  recipeImageUrl: string;
  description: string;
  ingredients: string;
  recipeDifficulty: string;
  totaltime: string;
  recipeInstructions: string;
  tags: Tag[];
};

const RecipePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const recipeId = searchParams.get("id");
  const { user } = useUser();
  const [recipe, setRecipe] = useState<Recipe>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tags, setTags] = useState<any[] | []>([]);
  const difficultyOptions = ["1", "2", "3", "4", "5"];

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<RecipeInputs>();

  const callGetRecipe = async () => {
    if (recipeId) {
      const response = await getRecipe(recipeId);
      if (response.status === 404) {
        router.push("/404");
        return;
      }
      setValue("recipeName", response.recipeName);
      setValue("recipeImageUrl", response.image);
      setValue("description", response.description);
      setValue("ingredients", response.ingredients);
      setValue("recipeDifficulty", response.recipeDifficulty);
      setValue("totaltime", response.totalMakeTime);
      setValue("recipeInstructions", response.recipeInstructions);
      setValue("tags", response.tags);
      setRecipe(response);
    }
  };
  const recipeImage = watch("recipeImageUrl");
  const activeTags = watch("tags");

  const getTags = async () => {
    const response = await getAllTags();
    if (response) setTags(response);
  };

  function addTag(tag: Tag): void {
    const currentTags = getValues("tags");
    if (currentTags.find((obj) => obj["tagName"] === tag.tagName)) {
      let copyOfTags = currentTags;
      const indexOfTag = copyOfTags.findIndex(
        (item) => item.tagName === tag.tagName
      );
      copyOfTags.splice(indexOfTag, 1);
      setValue("tags", copyOfTags);
    } else {
      let newTagArray = currentTags || [];
      newTagArray.push(tag);
      setValue("tags", newTagArray);
    }
  }

  useEffect(() => {
    getTags();
  }, []);

  const onSubmit: SubmitHandler<RecipeInputs> = async (data) => {
    const updatedRecipe = {
      _id: recipe?._id,
      image: data.recipeImageUrl,
      recipeName: data.recipeName,
      author: user.id,
      recipeDifficulty: data.recipeDifficulty,
      totalMakeTime: data.totaltime,
      ingredients: data.ingredients,
      description: data.description,
      recipeInstructions: data.recipeInstructions,
      tags: data.tags,
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
    <main className={styles.recipeMain}>
      {recipe ? (
        <>
          {isEditing ? (
            <form
              className={styles.editRecipeForm}
              onSubmit={handleSubmit(onSubmit)}
            >
              <FileUpload
                register={register}
                setValue={setValue}
                formField="recipeImageUrl"
                existingImage={recipeImage}
                rules={{ required: "An image is required" }}
                errorMsg={errors.recipeImageUrl?.message}
              />
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
              <Select
                register={register}
                formField="recipeDifficulty"
                placeholder="Select a recipe difficulty level"
                label="Difficulty"
                rules={{ required: "Recipe difficulty is required" }}
                options={difficultyOptions}
                errorMsg={errors.recipeDifficulty?.message}
              ></Select>
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
              <div className={styles.tagsContainer}>
                {tags.length > 0 ? (
                  tags.map((tag) => (
                    <>
                      <TagComponent
                        key={tag._id}
                        label={tag.tagName}
                        onclick={() => addTag(tag)}
                        isActive={
                          activeTags.some(
                            (activeTag: Tag) =>
                              activeTag.tagName === tag.tagName
                          )
                            ? true
                            : false
                        }
                      />
                    </>
                  ))
                ) : (
                  <p>No tags</p>
                )}
              </div>
              <div className={styles.editRecipeFormBtnContainer}>
                <Button
                  className={styles.updateRecipeBtn}
                  type="button"
                  onclick={() => setIsEditing(false)}
                  varient="secondary"
                  label="cancel"
                ></Button>
                <Button
                  className={styles.updateRecipeBtn}
                  type="submit"
                  varient="primary"
                  label="update recipe"
                ></Button>
              </div>
            </form>
          ) : (
            <div className={styles.recipeContainer}>
              <nav>
                <p className={styles.breadcrumbs}>
                  <Link href="/allrecipes">Recipes</Link>
                  <FontAwesomeIcon icon={faChevronRight} />
                  <span className={styles.currentRecipe}>
                    {recipe?.recipeName}
                  </span>
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
                      <p className={styles.userName}>{recipe?.author?.name}</p>
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
                  {user?.id === recipe?.author?._id || user?.isAdmin ? (
                    <Button
                      onclick={() => setIsEditing(!isEditing)}
                      label="edit"
                      varient="secondary"
                      className={styles.editBtn}
                    ></Button>
                  ) : null}
                  <div className={styles.recipeStats}>
                    <div>
                      <p>Difficulty: {recipe?.recipeDifficulty}</p>
                      <p>Cooking Time: {recipe?.totalMakeTime}</p>
                      <p>Ingredients: {recipe?.ingredients}</p>
                    </div>
                  </div>

                  <p>{recipe?.recipeInstructions}</p>
                  {recipe.tags?.length ? (
                    <p className={styles.recipeTags}>
                      <span className={styles.recipeTagsLabel}>tags:</span>
                      {recipe?.tags?.map((tag, index) => (
                        <>
                          {index + 1 === recipe?.tags?.length
                            ? tag.tagName
                            : `${tag.tagName},`}
                        </>
                      ))}
                    </p>
                  ) : null}
                </section>
              </article>
            </div>
          )}
        </>
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default RecipePage;
