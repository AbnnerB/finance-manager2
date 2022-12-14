// import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import MarkerCard from "../../Components/MarkerCard/MarkerCard";

import "./styles.css";

export default function CreateManager() {
  const [names, setNames] = useState("");
  const points = 0;
  const [ids, setIds] = useState(0);

  const [now, setNow] = useState("");
  // const dateToday = new Date().toLocaleTimeString();

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
      spots: points,
      infoData: [],
      date: now,
    };
    setIds(ids + 1);

    setArrayContainerInfo([...arrayContainerInfo, newObj]);
    showContainerCreateMarker();
    setNames("");
  }

  function deleteContainerInfo(id) {
    let confirm = window.confirm("Deseja realmente deletar esse item?");

    let filtered = arrayContainerInfo.filter((item) => item.id !== id);

    if (confirm === true) {
      setArrayContainerInfo(filtered);
      localStorage.setItem("arrayAllFinances", JSON.stringify(filtered));
    }
  }

  return (
    <div className="body">
      <article
        style={showContainer ? { display: "flex" } : { display: "none" }}
        className="backgroundContainerCreate"
      >
        <section className="containerCreateMarker">
          <h2>Adicione um novo participante!</h2>

          <input
            type="text"
            maxLength="20"
            placeholder="Digite um nome..."
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

      <header>
        <div className="headerContent">
          <h1>Crie seu mês </h1>
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
