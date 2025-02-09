import "./../../../globals.css";
import styles from "./FileUpload.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";

function FileUpload() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

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
