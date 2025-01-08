import styles from "./Tag.module.css";

type Props = {
  onclick?: React.MouseEventHandler<HTMLButtonElement>;
  label: string;
  isActive: boolean;
};

const Tag = (props: Props) => {
  return (
    <button
      type="button"
      onClick={props.onclick}
      className={`${styles.tag} ${props.isActive ? styles.active : ""}`}
    >
      {props.label}
    </button>
  );
};

export default Tag;
