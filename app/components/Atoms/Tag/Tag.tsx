import styles from "./Tag.module.css";

type Props = {
  onclick?: React.MouseEventHandler<HTMLButtonElement>;
  label: string;
};

const Tag = (props: Props) => {
  return (
    <button
      type="button"
      onClick={props.onclick}
      className={`${styles.tag} ${styles.active}`}
    >
      {props.label}
    </button>
  );
};

export default Tag;
