import { ChangeEventHandler } from "react";
import "./Input.css";

type Props = {
  inputType?: string;
  register: any;
  formField: string;
};
const Input = ({ register, formField, inputType }: Props) => {
  return <input type={inputType} className="input" {...register(formField)} />;
};

export default Input;
