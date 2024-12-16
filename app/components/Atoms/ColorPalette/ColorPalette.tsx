import "./../../../globals.css";
import "./ColorPalette.css";

const ColorPalette = () => {
  return (
    <section className="color-palette-container">
      <div className="color-box black"></div>
      <div className="color-box green"></div>
      <div className="color-box blue"></div>
      <div className="color-box red"></div>
    </section>
  );
};

export default ColorPalette;
