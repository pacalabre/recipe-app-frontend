import styles from "./Button.module.css";

type Props = {
  onclick?: React.MouseEventHandler<HTMLButtonElement>;
  label: string;
  varient: string;
  type?: string;
};

const Button = (props: Props) => {
  let buttonVarient;
  if (props.varient === "secondary") {
    buttonVarient = styles.secondary;
  } else if (props.varient === "tertiary") {
    buttonVarient = styles.tertiary;
  } else {
    buttonVarient = styles.primary;
  }

  const buttonType = props.type === "submit" ? "submit" : "button";
  return (
    <div className={styles.buttonContainer}>
      <button
        type={buttonType}
        onClick={props.onclick}
        className={`${styles.button} ${buttonVarient}`}
      >
        {props.label}
      </button>
    </div>
  );
};

export default Button;
