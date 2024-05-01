import { ChangeEventHandler } from "react";
import "./Input.css";

type Props = {
  onchange: ChangeEventHandler<HTMLInputElement>;
  inputType?: string;
};
const Input = (props: Props) => {
  return (
    <input type={props.inputType} onChange={props.onchange} className="input" />
  );
};

export default Input;
