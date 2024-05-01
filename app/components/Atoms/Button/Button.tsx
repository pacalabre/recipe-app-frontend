import "./Button.css";

type Props = {
  onclick: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
};

const Button = (props: Props) => {
  return (
    <button onClick={props.onclick} className="button">
      {props.text}
    </button>
  );
};

export default Button;
