"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../components/Atoms/Input/Input";
import TextArea from "../components/Atoms/TextArea/TextArea";

type NewRecipeInputs = {
  title: string;
  subtitle: string;
  description: string;
  ingredients: string;
  steps: string;
  easeOfMaking: string;
  totaltime: string;
};

const NewRecipe = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewRecipeInputs>();

  const onSubmit: SubmitHandler<NewRecipeInputs> = async (data) => {
    console.log("data", data);
  };
  return (
    <>
      <h2 className="page-title">New Recipe</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label>Recipe name:</label>
        <Input
          register={register}
          inputType="text"
          formField="title"
          rules={{ required: "Title is required" }}
        />
        {errors.title && <p>{errors.title.message}</p>}
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
        <label>Difficulty:</label>
        <Input
          register={register}
          inputType="text"
          formField="easeOfMaking"
          rules={{ required: "Ease of making is required" }}
        />
        {errors.easeOfMaking && <p>{errors.easeOfMaking.message}</p>}
        <label>Total Time:</label>
        <Input register={register} inputType="text" formField="totaltime" />
        <label>Instructions:</label>
        <TextArea
          register={register}
          formField="steps"
          rules={{ required: "Recipe steps are required" }}
        />
        {errors.steps && <p>{errors.steps.message}</p>}
        <button type="submit">Add Recipe</button>
      </form>
    </>
  );
};

export default NewRecipe;
