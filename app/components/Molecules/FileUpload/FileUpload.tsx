import "./../../../globals.css";
import styles from "./FileUpload.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useState } from "react";
import Button from "../../Atoms/Button/Button";

type Props = {
  setValue: UseFormSetValue<any> | any;
  rules?: object;
  errorMsg?: string;
  register: UseFormRegister<any> | any;
  formField: string;
};

function FileUpload({ setValue, rules, errorMsg, register, formField }: Props) {
  const [recipeImage, setRecipeImage] = useState("");
  const onDrop = (files: (string | Blob)[]) => {
    const data = new FormData();
    data.append("file", files[0]);
    data.append(
      "upload_preset",
      `${process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}`
    );
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_ACCOUNT}/image/upload`,
        data
      )
      .then((res) => {
        setRecipeImage(res.data.secure_url);
        setValue("recipeImageUrl", res.data.secure_url, {
          shouldValidate: true,
        });
      });
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <>
      <label className={styles.fileUploadLabel}>Upload Image</label>
      <section className={styles.fileUploadContainer}>
        <div {...getRootProps({ className: "dropzone" })}>
          {recipeImage ? (
            <div
              style={{
                backgroundImage: `url(${recipeImage})`,
              }}
              className={styles.recipeImageContainer}
            >
              <Button
                label="Remove Image"
                varient="secondary"
                onclick={() => {
                  setRecipeImage("");
                  setValue("recipeImageUrl", "");
                }}
              ></Button>
            </div>
          ) : (
            <div className={styles.fileUploadContent}>
              <FontAwesomeIcon
                icon={faImage}
                className={styles.imageIcon}
              ></FontAwesomeIcon>
              <input {...register(formField, rules)} {...getInputProps()} />
              <p className={styles.fileUploadMessage}>
                Drag and drop image, or click to select files
              </p>
            </div>
          )}
        </div>
      </section>
      {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
    </>
  );
}

export default FileUpload;
