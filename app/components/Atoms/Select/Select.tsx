import styles from "./Select.module.css";
import { UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<any> | any;
  formField: string;
  rules?: object;
  onchange?: React.ChangeEventHandler<HTMLSelectElement>;
  label: string;
  options: string[];
  placeholder: string;
  errorMsg?: string;
};

const Select = ({
  register,
  formField,
  rules,
  label,
  options,
  placeholder,
  errorMsg,
}: Props) => {
  const isError = errorMsg ? styles.error : "";
  return (
    <div className={["select-container", isError].join(" ")}>
      <label htmlFor={formField} className="select-label">
        {label}
      </label>
      <select
        {...register(formField, rules)}
        className={["select", styles.select].join(" ")}
        name={formField}
        id={formField}
      >
        <option value="">{placeholder}</option>
        {options?.map((optionValue: string, index: number) => (
          <option key={index} value={optionValue}>
            {optionValue}
          </option>
        ))}
      </select>
      {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
    </div>
  );
};

export default Select;
