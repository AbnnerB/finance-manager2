import { useEffect, useState } from "react";

import "./styles.css";

import { AiFillDelete } from "react-icons/ai";
import { FiArrowUpCircle, FiArrowDownCircle } from "react-icons/fi";
import { FaDollarSign } from "react-icons/fa";

import CardResults from "../../Components/CardResults/CardResults";

export default function Manager() {
  const [products, setProducts] = useState("");
  const [values, setValues] = useState("");
  const [id, setId] = useState(0);
  const [inputRadio, setInputRadio] = useState({ typeInput: "entrada" });

  const [totalReceived, setTotalReceived] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [finalResult, setFinalResult] = useState(0);

  const [arrayLine, setArrayLine] = useState(
    () => JSON.parse(localStorage.getItem("arrayManagerLocal")) || []
  );

  // Aqui eu tenho o meu array infoData dentro de arrayAllFinances
  const storedAllFinances =
    JSON.parse(localStorage.getItem("arrayAllFinances")) || [];

  let getInfoData = storedAllFinances.map((item) => {
    return item.infoData;
  });

  const [addInfoData, setAddInfoData] = useState(getInfoData);

  // console.log(getInfoData);

  // getInfoData[0] = { nome: "aaa" };
  // Aqui eu tenho o meu array dentro de arrayAllFinances

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

  function handleInputRadioChange(e) {
    const { name, value } = e.target;

    setInputRadio({ ...inputRadio, [name]: value });
  }

  function addLine(e) {
    e.preventDefault();

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
      valueType: inputRadio.typeInput,
      id: id,
    };
    setId(id + 1);

    setArrayLine([...arrayLine, lineObj]);

    getInfoData[0] = [lineObj];
    console.log(getInfoData);

    // getInfoData[0] = lineObj;

    setProducts("");
    setValues("");
  }

  useEffect(() => {
    localStorage.setItem("arrayManagerLocal", JSON.stringify(arrayLine));

    function addReceived(total, item) {
      let totalTrue = 0;
      if (item.valueType === "entrada") {
        totalTrue += parseFloat(item.values);
      }

      return total + totalTrue;
    }
    function addExpenses(total, item) {
      let totalFalse = 0;
      if (item.valueType === "saida") {
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
        <form className="topoInputs" onSubmit={addLine}>
          <div className="containerLabelInputs">
            <label>
              Descrição
              <input
                type="text"
                name="inputName"
                placeholder="Digite um nome"
                value={products}
                onChange={(e) => setProducts(e.target.value)}
                autoFocus
                maxLength="25"
              />
            </label>
          </div>
          <div className="containerLabelInputs">
            <label>
              Valor
              <input
                type="number"
                name="inputValue"
                placeholder="Digite um valor"
                value={values}
                min="1"
                onChange={(e) => setValues(e.target.value)}
              />
            </label>
          </div>
          <div className="containerLabelInputsRadio">
            <div>
              <label>
                <input
                  type="radio"
                  name="typeInput"
                  value="entrada"
                  onChange={handleInputRadioChange}
                  checked={inputRadio.typeInput === "entrada"}
                />
                Entrada
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="typeInput"
                  value="saida"
                  onChange={handleInputRadioChange}
                  checked={inputRadio.typeInput === "saida"}
                />
                Saida
              </label>
            </div>
          </div>

          <button>Adicionar</button>
        </form>
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
                      {item.valueType === "entrada" ? (
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
