import "./Button.css";

const Button = (props: any) => {
  return (
    <button onClick={props.onclick} className="button">
      {props.text}
    </button>
  );
};

export default Button;
