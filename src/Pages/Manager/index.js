import { useEffect, useState } from "react";

import "./styles.css";

//Função desta branch resolver erro da url
//deixando anotado pra eu retornar futuramente quando eu aprender como resolver

import { Link, useParams } from "react-router-dom";

import CardResults from "../../Components/CardResults/CardResults";
import { AiFillDelete } from "react-icons/ai";
import { FiArrowUpCircle, FiArrowDownCircle } from "react-icons/fi";
import { FaDollarSign } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";

export default function Manager() {
  const idUrl = useParams();
  const idUrlNumber = parseInt(idUrl.id);

  const [products, setProducts] = useState("");
  const [values, setValues] = useState("");
  const [id, setId] = useState(0);
  const [inputRadio, setInputRadio] = useState({ typeInput: "entrada" });

  const [totalReceived, setTotalReceived] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [finalResult, setFinalResult] = useState(0);

  const [storedAllFinances, setStoredAllFinances] = useState(
    JSON.parse(localStorage.getItem("arrayAllFinances")) || []
  );
  const [addInfoDataArray, setAddInfoDataArray] = useState(
    storedAllFinances[idUrlNumber].infoData || []
  );

  useEffect(() => {
    let storedArray =
      JSON.parse(localStorage.getItem("arrayAllFinances")) || [];

    let storedInfoArray = storedArray[idUrlNumber].infoData;

    let getId = storedInfoArray.map((task) => {
      return task.id;
    });

    let lastId = getId[getId.length - 1];

    setId(lastId + 1 || 0);
  }, [idUrlNumber]);

  useEffect(() => {
    if (values.length > 9) {
      setValues("999999999");
    }
  }, [values]);

  function handleInputRadioChange(e) {
    const { name, value } = e.target;

    setInputRadio({ ...inputRadio, [name]: value });
  }

  function addLine(e) {
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

    setAddInfoDataArray([...addInfoDataArray, lineObj]);
    storedAllFinances[idUrlNumber].infoData = addInfoDataArray;

    setStoredAllFinances(storedAllFinances);
    setProducts("");
    setValues("");
  }

  useEffect(() => {
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

    const resultReceived = addInfoDataArray.reduce(addReceived, 0);
    setTotalReceived(resultReceived);

    const resultExpenses = addInfoDataArray.reduce(addExpenses, 0);
    setTotalExpense(resultExpenses);

    setFinalResult(resultReceived - resultExpenses);

    storedAllFinances[idUrlNumber].resultTotal = finalResult;

    storedAllFinances[idUrlNumber].infoData = addInfoDataArray;
    localStorage.setItem("arrayAllFinances", JSON.stringify(storedAllFinances));
  }, [storedAllFinances, addInfoDataArray, idUrlNumber, finalResult]);

  function deleteLine(id) {
    let filtered2 = addInfoDataArray.filter((line) => line.id !== id);
    setAddInfoDataArray(filtered2);
    storedAllFinances[idUrlNumber].infoData = addInfoDataArray;

    localStorage.setItem("arrayAllFinances", JSON.stringify(storedAllFinances));
  }

  const [hideToPrint, setHideToPrint] = useState(false);

  function hideComponents() {
    setHideToPrint(true);

    setTimeout(() => {
      window.print();
    }, 800);

    // setTimeout(() => {
    //   setHideToPrint(false);
    // }, 5000);
  }

  function showComponentsHidde() {
    setHideToPrint(false);
  }

  return (
    <>
      <article
        className="screenFinalizeShowHideComponents"
        style={hideToPrint ? { display: "block" } : { display: "none" }}
        onClick={showComponentsHidde}
      ></article>

      <header className="headerManager">
        <div className="nameAndLinkReturn">
          <Link to="/">
            <GoArrowLeft title="Voltar a Pagina incial" />
          </Link>

          <h1 style={hideToPrint ? { color: "black" } : { color: "white" }}>
            {storedAllFinances[idUrlNumber].name}
          </h1>
        </div>

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
        <section
          className="topoInputs"
          style={hideToPrint ? { display: "none" } : { display: "flex" }}
        >
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

          <button onClick={addLine}>Adicionar</button>
        </section>
        <section className="sectionTable">
          {addInfoDataArray.length >= 1 && (
            <table border="1" className={hideToPrint ? "tablePrint" : ""}>
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Valor</th>
                  <th>Tipo</th>
                  <th
                    style={hideToPrint ? { display: "none" } : { display: "" }}
                  ></th>
                </tr>
              </thead>
              <tbody>
                {addInfoDataArray.map((item, index) => (
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
                    <td
                      className="tdButton"
                      style={
                        hideToPrint ? { display: "none" } : { display: "" }
                      }
                    >
                      <button onClick={() => deleteLine(item.id)}>
                        <AiFillDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td
                    style={hideToPrint ? { display: "none" } : { display: "" }}
                    colSpan={4}
                    onClick={hideComponents}
                  >
                    <button>Finalizar</button>
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </section>
      </div>
    </>
  );
}
