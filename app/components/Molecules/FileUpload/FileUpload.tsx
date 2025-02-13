import "./../../../globals.css";
import styles from "./FileUpload.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useDropzone } from "react-dropzone";
import axios from "axios";

function FileUpload() {
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
      .then((data) => {
        console.log("data", data);
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
          <div className={styles.fileUploadContent}>
            <FontAwesomeIcon
              icon={faImage}
              className={styles.imageIcon}
            ></FontAwesomeIcon>
            <input {...getInputProps()} />
            <p>Drag and drop image, or click to select files</p>
          </div>
          {files.length ? (
            <aside>
              <h4>Recipe Image</h4>
              <ul>{files}</ul>
            </aside>
          ) : null}
        </div>
      </section>
    </>
  );
}

export default FileUpload;
