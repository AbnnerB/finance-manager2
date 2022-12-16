import { useState, useEffect } from "react";
import MarkerCard from "../../Components/MarkerCard/MarkerCard";

import "./styles.css";

export default function CreateManager() {
  const [names, setNames] = useState("");
  const [ids, setIds] = useState(0);
  const now = new Date().toLocaleDateString();

  const [showContainer, setShowContainer] = useState(false);

  const [arrayContainerInfo, setArrayContainerInfo] = useState(
    () => JSON.parse(localStorage.getItem("arrayAllFinances")) || []
  );

  useEffect(() => {
    localStorage.setItem(
      "arrayAllFinances",
      JSON.stringify(arrayContainerInfo)
    );
  }, [arrayContainerInfo]);

  useEffect(() => {
    let storedArray = JSON.parse(localStorage.getItem("arrayAllFinances"));
    let getId = storedArray.map((task) => {
      return task.id;
    });

    let lastId = getId[getId.length - 1];

    setIds(lastId + 1 || 0);
  }, []);

  function showContainerCreateMarker() {
    if (showContainer === false) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    setShowContainer(!showContainer);
  }

  function addContainerInfo() {
    if (names.length < 1) {
      alert("Preencha o campo de textos");
      return;
    }

    const newObj = {
      id: ids,
      name: names,
      infoData: [],
      date: now,
      resultTotal: 0,
    };
    setIds(ids + 1);

    setArrayContainerInfo([...arrayContainerInfo, newObj]);
    showContainerCreateMarker();
    setNames("");
    window.location.reload();
  }

  function deleteContainerInfo(id) {
    let confirm = window.confirm("Deseja realmente deletar esse item?");

    let filtered = arrayContainerInfo.filter((item) => item.id !== id);

    if (confirm === true) {
      setArrayContainerInfo(filtered);
      localStorage.setItem("arrayAllFinances", JSON.stringify(filtered));
    }

    setNames("");
    window.location.reload();
  }

  return (
    <div className="body">
      <article
        style={showContainer ? { display: "flex" } : { display: "none" }}
        className="backgroundContainerCreate"
      >
        <section className="containerCreateMarker">
          <h2>Adicionar...</h2>

          <input
            type="text"
            maxLength="50"
            placeholder="Digite aqui..."
            value={names}
            onChange={(e) => setNames(e.target.value)}
            autoFocus
            className="inputCreateMarker"
          />

          <div className="divButtonsCreateCancel">
            <button onClick={addContainerInfo}>Criar</button>
            <button onClick={showContainerCreateMarker}>Cancelar</button>
          </div>
        </section>
      </article>

      <header className="headerCreateManager">
        <div className="headerContent">
          <h1>Controle de Finanças</h1>
          <button onClick={showContainerCreateMarker}>Adicionar</button>
        </div>
      </header>
      <main className="containerMain">
        {arrayContainerInfo.map((item, index) => (
          <div key={index}>
            <MarkerCard
              index={index}
              item={item}
              deleteContainerInfo={deleteContainerInfo}
            />
          </div>
        ))}
      </main>
    </div>
  );
}
