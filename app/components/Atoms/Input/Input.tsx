import styles from "./Input.module.css";
import { UseFormRegister } from "react-hook-form";

type Props = {
  inputType?: string;
  register: UseFormRegister<any> | any;
  formField: string;
  rules?: object;
  label?: string;
};
const Input = ({ register, formField, inputType, rules, label }: Props) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.inputLabel}>{label}</label>
      <input
        type={inputType}
        className={styles.input}
        {...register(formField, rules)}
      />
    </div>
  );
};

export default Input;
