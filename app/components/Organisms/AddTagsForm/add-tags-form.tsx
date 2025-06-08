import Button from "../../Atoms/Button/Button";
import Input from "../../Molecules/Input/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { Tag } from "@/app/types/tagTypes";
import { getAllTags, addTag } from "@/app/services/tag-service";
import { useEffect, useState } from "react";
import { useUser } from "@/app/contextApi/UserProvider";
import styles from "./addTags.module.css";

type addTagForm = {
  tagName: string;
};

const AddTagsForm = () => {
  const { user } = useUser();
  const [tags, setTags] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<addTagForm>();

  useEffect(() => {
    if (user && user.isAdmin) getTags();
  }, [user]);

  const getTags = async () => {
    const response = await getAllTags();
    if (response) setTags(response);
  };

  const addNewTag: SubmitHandler<addTagForm> = async (data) => {
    const response = await addTag(data.tagName);
    if (response) {
      getTags();
      reset();
    }
  };

  return (
    <section>
      <h3>Add Tags</h3>
      <form className={styles.addTagForm} onSubmit={handleSubmit(addNewTag)}>
        <Input
          register={register}
          inputType="text"
          label="Add New Tag"
          formField="tagName"
        ></Input>
        <Button
          className={styles.addTagButton}
          type="submit"
          label="Add Tag"
          varient="primary"
        ></Button>
      </form>
      <p>Current Tags:</p>
      {tags?.map((tag: Tag) => (
        <span key={tag._id} className={styles.tagLabel}>
          {tag.tagName}
        </span>
      ))}
    </section>
  );
};

export default AddTagsForm;
