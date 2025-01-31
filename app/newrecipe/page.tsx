"use client";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUser } from "../contextApi/UserProvider";
import { addNewRecipe } from "../services/recipe-service";
import { getAllTags } from "../services/tag-service";
import Input from "../components/Molecules/Input/Input";
import TextArea from "../components/Atoms/TextArea/TextArea";
import Button from "../components/Atoms/Button/Button";
import Tag from "../components/Atoms/Tag/Tag";

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
    watch,
    formState: { errors },
  } = useForm<NewRecipeInputs>();

  const activeTags = watch("tags");

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
        <div>
          {tags.length > 0 ? (
            tags.map((tag) => (
              <Tag
                key={tag._id}
                label={tag.tagName}
                onclick={() => addTag(tag._id)}
                isActive={activeTags?.includes(tag._id) ? true : false}
              />
            ))
          ) : (
            <p>No tags</p>
          )}
        </div>
        <Button type="submit" varient="primary" label="add recipe"></Button>
      </form>
    </>
  );
};

export default NewRecipe;
