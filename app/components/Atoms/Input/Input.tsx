import "./Input.css";
import { UseFormRegister } from "react-hook-form";

type Props = {
  inputType?: string;
  register: UseFormRegister<any>;
  formField: string;
  rules?: object;
};
const Input = ({ register, formField, inputType, rules }: Props) => {
  return (
    <input type={inputType} className="input" {...register(formField, rules)} />
  );
};

export default Input;
