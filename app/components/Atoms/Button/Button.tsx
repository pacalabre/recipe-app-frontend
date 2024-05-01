import "./Button.css";

type Props = {
  onclick: React.MouseEventHandler<HTMLButtonElement>;
  label: string;
};

const Button = (props: Props) => {
  return (
    <button onClick={props.onclick} className="button">
      {props.label}
    </button>
  );
};

export default Button;
