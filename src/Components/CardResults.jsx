import "./styles.css";

export default function CardResults({ name, icon, value }) {
  return (
    <div className="CardResults">
      <div className="typeValue">
        <h3>{name}</h3>
        <span>{icon}</span>
      </div>
      <span
        className="valueResult"
        style={value < 0 ? { color: "red" } : { color: "black" }}
      >
        {value.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
      </span>
    </div>
  );
}
