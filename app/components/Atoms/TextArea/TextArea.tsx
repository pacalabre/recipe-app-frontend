import { UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<any>;
  formField: string;
  rules?: object;
};
const TextArea = ({ register, formField, rules }: Props) => {
  return (
    <textarea
      className="textarea"
      autoComplete="true"
      autoCorrect="true"
      {...register(formField, rules)}
    />
  );
};

export default TextArea;
