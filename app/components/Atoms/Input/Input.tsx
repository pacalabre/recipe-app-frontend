import "./Input.css";

const Input = (props: any) => {
  return <input onChange={props.onchange} className="input" />;
};

export default Input;
