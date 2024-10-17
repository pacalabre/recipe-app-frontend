"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUser } from "../contextApi/UserProvider";
import { addNewRecipe } from "../services/recipe-service";
import Input from "../components/Atoms/Input/Input";
import TextArea from "../components/Atoms/TextArea/TextArea";

type NewRecipeInputs = {
  recipeName: string;
  subtitle: string;
  description: string;
  ingredients: string;
  recipeDifficulty: string;
  totaltime: string;
  recipeInstructions: string;
};

const NewRecipe = () => {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewRecipeInputs>();

  const onSubmit: SubmitHandler<NewRecipeInputs> = async (data) => {
    addNewRecipe(
      data.recipeName,
      data.subtitle,
      user.id,
      data.recipeDifficulty,
      data.totaltime,
      data.ingredients,
      data.description,
      data.recipeInstructions
    );
  };
  return (
    <>
      <h2 className="page-title">New Recipe</h2>
      <span>
        Loggedin User: {user ? user.name : "No user currently logged in"}
      </span>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label>Recipe name:</label>
        <Input
          register={register}
          inputType="text"
          formField="recipeName"
          rules={{ required: "Recipe name is required" }}
        />
        {errors.recipeName && <p>{errors.recipeName.message}</p>}
        <label>Subtitle:</label>
        <Input register={register} inputType="text" formField="subtitle" />
        <label>Description:</label>
        <Input
          register={register}
          inputType="text"
          formField="description"
          rules={{ required: "Description is required" }}
        />
        {errors.description && <p>{errors.description.message}</p>}
        <label>Ingredients:</label>
        <Input
          register={register}
          inputType="text"
          formField="ingredients"
          rules={{ required: "Ingredients are required" }}
        />
        {errors.ingredients && <p>{errors.ingredients.message}</p>}
        <label>Recipe Difficulty:</label>
        <Input
          register={register}
          inputType="text"
          formField="recipeDifficulty"
          rules={{ required: "Recipe difficulty is required" }}
        />
        {errors.recipeDifficulty && <p>{errors.recipeDifficulty.message}</p>}
        <label>Total Time:</label>
        <Input register={register} inputType="text" formField="totaltime" />
        <label>Instructions:</label>
        <TextArea
          register={register}
          formField="recipeInstructions"
          rules={{ required: "Instructions are required" }}
        />
        {errors.recipeInstructions && (
          <p>{errors.recipeInstructions.message}</p>
        )}
        <button type="submit">Add Recipe</button>
      </form>
    </>
  );
};

export default NewRecipe;
