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
    <div className={["input-container", isError].join(" ")}>
      <label className="input-label">{label}</label>
      <input
        type={inputType}
        className={["input", styles.input].join(" ")}
        {...register(formField, rules)}
      />
      {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
    </div>
  );
};

export default Input;
