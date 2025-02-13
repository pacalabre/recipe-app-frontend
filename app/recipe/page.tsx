"use client";
import { useEffect, useState } from "react";
import { getRecipe, updateRecipe } from "../services/recipe-service";
import { useSearchParams } from "next/navigation";
import { useUser } from "../contextApi/UserProvider";
import Link from "next/link";
import { Recipe } from "../types/recipeTypes";
import Input from "../components/Molecules/Input/Input";
import TextArea from "../components/Atoms/TextArea/TextArea";
import { useForm, SubmitHandler } from "react-hook-form";
import { Tag } from "../types/tagTypes";
import Button from "../components/Atoms/Button/Button";

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
  return (
    <>
      <img src={recipe?.image} alt={`Recipe image for ${recipe?.recipeName}`} />
      <h2>{recipe?.recipeName}</h2>
      <p>
        {recipe?.subtitle} by {recipe?.author.name}
      </p>
      {user?.id === recipe?.author._id ? (
        <Button
          onclick={() => setIsEditing(!isEditing)}
          label="edit"
          varient="secondary"
        ></Button>
      ) : null}
      {isEditing ? (
        <form className="recipe-form" onSubmit={handleSubmit(onSubmit)}>
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
            type="submit"
            varient="primary"
            label="update recipe"
          ></Button>
        </form>
      ) : (
        <>
          <p>Recipe difficulty: {recipe?.recipeDifficulty}</p>
          <p>Cooking Time: {recipe?.totalMakeTime}</p>
          <p>Ingredients: {recipe?.ingredients}</p>
          <p>Instructions: {recipe?.recipeInstructions}</p>
          {recipe?.tags?.map((tag: Tag) => <p>{tag.tagName}</p>)}
        </>
      )}
    </>
  );
};

export default RecipePage;
