import { useEffect, useState } from "react";

import "./styles.css";

import { AiFillDelete } from "react-icons/ai";
import { FiArrowUpCircle, FiArrowDownCircle } from "react-icons/fi";
import { FaDollarSign } from "react-icons/fa";

import CardResults from "../../Components/CardResults";

export default function Manager() {
  const [products, setProducts] = useState("");
  const [values, setValues] = useState("");
  const [inputRadio, setInputRadio] = useState(true);
  const [id, setId] = useState(0);

  const [totalReceived, setTotalReceived] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [finalResult, setFinalResult] = useState(0);

  const [arrayLine, setArrayLine] = useState(
    () => JSON.parse(localStorage.getItem("arrayManagerLocal")) || []
  );

  useEffect(() => {
    let storedArray =
      JSON.parse(localStorage.getItem("arrayManagerLocal")) || [];
    let getId = storedArray.map((task) => {
      return task.id;
    });

    let lastId = getId[getId.length - 1];

    setId(lastId + 1 || 0);
  }, []);

  useEffect(() => {
    if (values.length > 6) {
      setValues("99999");
    }
  }, [values]);

  function addLine() {
    if (products.length < 1 || values.length < 1) {
      alert("Preencha as caixas de textos");
      return;
    }

    if (values <= 0) {
      alert("Digite um valor diferente de 0");
      return;
    }

    const lineObj = {
      product: products,
      values: values,
      valueType: inputRadio,
      id: id,
    };
    setId(id + 1);

    setArrayLine([...arrayLine, lineObj]);

    setProducts("");
    setValues("");
  }

  useEffect(() => {
    setInputRadio(true);

    localStorage.setItem("arrayManagerLocal", JSON.stringify(arrayLine));

    function addReceived(total, item) {
      let totalTrue = 0;
      if (item.valueType === true) {
        totalTrue += parseFloat(item.values);
      }

      return total + totalTrue;
    }
    function addExpenses(total, item) {
      let totalFalse = 0;
      if (item.valueType === false) {
        totalFalse += parseFloat(item.values);
      }

      return total + totalFalse;
    }

    const resultReceived = arrayLine.reduce(addReceived, 0);
    setTotalReceived(resultReceived);

    const resultExpenses = arrayLine.reduce(addExpenses, 0);
    setTotalExpense(resultExpenses);

    setFinalResult(resultReceived - resultExpenses);
  }, [arrayLine]);

  function deleteLine(id) {
    let filtered = arrayLine.filter((line) => line.id !== id);
    setArrayLine(filtered);

    localStorage.setItem("arrayManagerLocal", JSON.stringify(filtered));
  }

  return (
    <>
      <header>
        <h1>Gestor de finanças</h1>

        <section className="containerCards">
          <CardResults
            name="Entrada"
            icon={<FiArrowUpCircle />}
            value={totalReceived}
          />
          <CardResults
            name="Saida"
            icon={<FiArrowDownCircle />}
            value={totalExpense}
          />
          <CardResults
            name="Total"
            icon={<FaDollarSign />}
            value={finalResult}
          />
        </section>
      </header>
      <div className="containerContent">
        <section className="topoInputs">
          <div className="containerLabelInputs">
            <label>Descrição</label>
            <input
              type="text"
              name="inputName"
              placeholder="Digite um nome"
              value={products}
              onChange={(e) => setProducts(e.target.value)}
              autoFocus
              maxLength="25"
            />
          </div>
          <div className="containerLabelInputs">
            <label>Valor</label>
            <input
              type="number"
              name="inputValue"
              placeholder="Digite um valor"
              value={values}
              min="1"
              onChange={(e) => setValues(e.target.value)}
            />
          </div>
          <div className="containerLabelInputsRadio">
            <div>
              <input
                type="radio"
                name="typeInput"
                checked
                value={inputRadio}
                onChange={(e) => setInputRadio(e.target.value)}
                onClick={() => setInputRadio(true)}
              />
              <label>Entrada</label>
            </div>
            <div>
              <input
                type="radio"
                name="typeInput"
                onClick={() => setInputRadio(false)}
              />
              <label>Saida</label>
            </div>
          </div>

          <button onClick={addLine}>Adicionar</button>
        </section>
        <section className="sectionTable">
          {arrayLine.length >= 1 && (
            <table border="1">
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Valor</th>
                  <th>Tipo</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {arrayLine.map((item, index) => (
                  <tr key={index}>
                    <td className="tdProductValue">{item.product} </td>
                    <td className="tdProductValue">{`R$ ${item.values}`}</td>
                    <td className="tdType">
                      {item.valueType ? (
                        <FiArrowUpCircle size="20" color="green" />
                      ) : (
                        <FiArrowDownCircle size="20" color="red" />
                      )}
                    </td>
                    <td className="tdButton">
                      <button onClick={() => deleteLine(item.id)}>
                        <AiFillDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </>
  );
}
