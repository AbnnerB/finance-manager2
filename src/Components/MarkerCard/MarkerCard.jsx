import { AiFillDelete } from "react-icons/ai";
import { BsBookmarkDash, BsBookmarkPlus } from "react-icons/bs";

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
        <div className="spotsFlex">
          <span>{item.spots}</span>
        </div>
        {item.spots > 0 && <p>Ultima Marcação: {item.date} </p>}
      </div>
    </section>
  );
}
