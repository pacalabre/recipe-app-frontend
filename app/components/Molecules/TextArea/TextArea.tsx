import { UseFormRegister } from "react-hook-form";
import styles from "./TextArea.module.css";

type Props = {
  register: UseFormRegister<any> | any;
  formField: string;
  rules?: object;
  label?: string;
  errorMsg?: string;
};
const TextArea = ({ register, formField, rules, label, errorMsg }: Props) => {
  const isError = errorMsg ? styles.error : "";
  return (
    <div className={["textarea-container", isError].join(" ")}>
      <label className="textarea-label">{label}</label>
      <textarea
        className={["textarea", styles.textarea].join(" ")}
        autoComplete="true"
        autoCorrect="true"
        {...register(formField, rules)}
      />
      {errorMsg && errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
    </div>
  );
};

export default TextArea;
