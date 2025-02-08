import "./../../../globals.css";
import styles from "./FileUpload.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const FileUpload = () => {
  return (
    <>
      <label className={styles.fileUploadLabel}>Upload Image</label>
      <div className={styles.fileUploadContentContainer}>
        <FontAwesomeIcon
          icon={faImage}
          className={styles.imageIcon}
        ></FontAwesomeIcon>
        <div className={styles.fileUploadButtonContainer}>
          <p className={styles.fileUploadP}>Drag or drop an image or</p>
          <input className={styles.fileUpload} type="file" />
        </div>
      </div>
    </>
  );
};

export default FileUpload;
