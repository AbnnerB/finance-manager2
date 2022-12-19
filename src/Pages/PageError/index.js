import { Link } from "react-router-dom";

import "./style.css";

export default function PageError() {
  return (
    <div className="pageErrorStyle">
      <h1>Esta Pagina não existe!</h1>
      <Link to="/">Voltar a Pagina Inicial</Link>
    </div>
  );
}
