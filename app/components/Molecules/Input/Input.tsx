import styles from "./Input.module.css";
import { FieldError, FieldErrors, UseFormRegister } from "react-hook-form";
import { RegisterFormInputs } from "@/app/types/registerFormInputTypes";

type Props = {
  inputType?: string;
  register: UseFormRegister<any> | any;
  formField: string;
  rules?: object;
  label?: string;
  errorMsg?: string;
};

const Input = ({
  register,
  formField,
  inputType,
  rules,
  label,
  errorMsg,
}: Props) => {
  const isError = errorMsg ? styles.error : "";
  return (
    <div className={`${styles.inputContainer} ${isError}`}>
      <label className={styles.inputLabel}>{label}</label>
      <input
        type={inputType}
        className={styles.input}
        {...register(formField, rules)}
      />
      {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
    </div>
  );
};

export default Input;
