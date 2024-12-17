"use client";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUser } from "../contextApi/UserProvider";
import { addNewRecipe } from "../services/recipe-service";
import { getAllTags } from "../services/tag-service";
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
  tags: string[];
};

const NewRecipe = () => {
  const { user } = useUser();
  const [tags, setTags] = useState<any[] | []>([]);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<NewRecipeInputs>();

  const getTags = async () => {
    const response = await getAllTags();
    if (response) setTags(response);
  };

  useEffect(() => {
    getTags();
  }, []);

  const onSubmit: SubmitHandler<NewRecipeInputs> = async (data) => {
    addNewRecipe(
      data.recipeName,
      data.subtitle,
      user.id,
      data.recipeDifficulty,
      data.totaltime,
      data.ingredients,
      data.description,
      data.recipeInstructions,
      data.tags
    );
  };

  function addTag(tagName: any): void {
    const currentTags = getValues("tags");
    if (currentTags && currentTags.includes(tagName)) {
      let copyOfTags = currentTags;
      const indexOfTag = copyOfTags.indexOf(tagName);
      copyOfTags.splice(indexOfTag, 1);
      setValue("tags", copyOfTags);
    } else {
      let newTagArray = currentTags || [];
      newTagArray.push(tagName);
      setValue("tags", newTagArray);
    }
  }

  return (
    <>
      <h2 className="page-title">New Recipe</h2>
      <span>
        Loggedin User: {user ? user.name : "No user currently logged in"}
      </span>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="recipe name"
          register={register}
          inputType="text"
          formField="recipeName"
          rules={{ required: "Recipe name is required" }}
        />
        {errors.recipeName && <p>{errors.recipeName.message}</p>}
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
        />
        {errors.description && <p>{errors.description.message}</p>}
        <Input
          label="ingredients"
          register={register}
          inputType="text"
          formField="ingredients"
          rules={{ required: "Ingredients are required" }}
        />
        {errors.ingredients && <p>{errors.ingredients.message}</p>}
        <Input
          label="recipe difficulty"
          register={register}
          inputType="text"
          formField="recipeDifficulty"
          rules={{ required: "Recipe difficulty is required" }}
        />
        {errors.recipeDifficulty && <p>{errors.recipeDifficulty.message}</p>}
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
        <div>
          Tags:
          {tags.length > 0 ? (
            tags.map((tag) => (
              <button type="button" onClick={() => addTag(tag._id)}>
                {tag.tagName}
              </button>
            ))
          ) : (
            <p>No tags</p>
          )}
        </div>
        <button type="submit">Add Recipe</button>
      </form>
    </>
  );
};

export default NewRecipe;
