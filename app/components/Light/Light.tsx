import "./Light.css";

type Props = {
  varient: "green" | "yellow" | "red";
  text: "";
};

const Light = ({ varient, text }: Props) => {
  return (
    <div className="light" style={{ backgroundColor: varient }}>
      <p>{text}</p>
    </div>
  );
};

export default Light;
