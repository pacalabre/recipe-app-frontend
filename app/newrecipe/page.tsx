"use client";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUser } from "../contextApi/UserProvider";
import { addNewRecipe } from "../services/recipe-service";
import { getAllTags } from "../services/tag-service";
import Input from "../components/Molecules/Input/Input";
import TextArea from "../components/Molecules/TextArea/TextArea";
import Button from "../components/Atoms/Button/Button";
import TagComponent from "../components/Atoms/Tag/Tag";
import styles from "./NewRecipe.module.css";
import { useRouter } from "next/navigation";
import Select from "../components/Atoms/Select/Select";

type NewRecipeInputs = {
  recipeImageUrl: string;
  recipeName: string;
  description: string;
  ingredients: string;
  recipeDifficulty: string;
  totaltime: string;
  recipeInstructions: string;
  tags: string[];
};

const NewRecipe = () => {
  const router = useRouter();
  const { user } = useUser();
  const [tags, setTags] = useState<any[] | []>([]);
  const difficultyOptions = ["1", "2", "3", "4", "5"];

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
    const response = await addNewRecipe(
      data.recipeImageUrl,
      data.recipeName,
      user.id,
      data.recipeDifficulty,
      data.totaltime,
      data.ingredients,
      data.description,
      data.recipeInstructions,
      data.tags
    );

    if (response) {
      router.push("/allrecipes");
    }
  };

  function addTag(tagId: string): void {
    const currentTags = getValues("tags");
    if (currentTags && currentTags.includes(tagId)) {
      let copyOfTags = currentTags;
      const indexOfTag = copyOfTags.indexOf(tagId);
      copyOfTags.splice(indexOfTag, 1);
      setValue("tags", copyOfTags);
    } else {
      let newTagArray = currentTags || [];
      newTagArray.push(tagId);
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
          rules={{
            required: "Recipe name is required",
            maxLength: {
              value: 150,
              message: "Recipe name can not be longer than 150 characters long",
            },
          }}
          errorMsg={errors.recipeName?.message}
        />
        <Input
          label="description (optional)"
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
          label="Make time"
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
        <TextArea
          label="instructions"
          register={register}
          formField="recipeInstructions"
          rules={{ required: "Instructions are required" }}
          errorMsg={errors.recipeInstructions?.message}
        />
        <div className={styles.tagsContainer}>
          {tags.length > 0 ? (
            tags.map((tag) => (
              <TagComponent
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
        <Button
          className={styles.button}
          type="submit"
          varient="primary"
          label="add recipe"
        ></Button>
      </form>
    </>
  );
};

export default NewRecipe;
