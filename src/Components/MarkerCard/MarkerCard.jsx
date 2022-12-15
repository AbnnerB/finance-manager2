import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function MarkerCard({ item, deleteContainerInfo }) {
  return (
    <section className="containerInfo">
      <div className="nameAndDeletteButton">
        <p className="titleName">{item.name}</p>
        <button
          className="deleteButton"
          onClick={() => deleteContainerInfo(item.id)}
        >
          <AiFillDelete />
        </button>
      </div>
      <div className="spots">
        <span className="createDate">Criado dia {item.date}</span>
        <div>
          <Link className="moneyCard" to={`/manager/${item.id}`}>
            {item.spots}
          </Link>
        </div>
      </div>
    </section>
  );
}
