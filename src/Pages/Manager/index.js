import { useEffect, useState } from "react";

import "./styles.css";

import CardResults from "../../Components/CardResults/CardResults";
import { Link, useParams } from "react-router-dom";

import { AiFillDelete } from "react-icons/ai";
import { FiArrowUpCircle, FiArrowDownCircle } from "react-icons/fi";
import { FaDollarSign } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
// import jsPDF from "jspdf";
import TablePdf from "../../Components/TablePdf";

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

  //Função imprimir/ PDF

  // console.log(resultExpenses);

  //doc.text(
  // `${storedAllFinances[idUrlNumber].name}

  // ${storedAllFinances[idUrlNumber].resultTotal.toLocaleString("pt-br", {
  //   style: "currency",
  //   currency: "BRL",
  // })}

  //   `,

  // let arrayPdf = JSON.stringify(addInfoDataArray);

  // let arrayAleatorio = ["12", "fdsafds", "Comida"];

  function transformPdf() {
    // let doc = new jsPDF();
    // doc.text("teste Somente teste", 10, 10);
    // doc.autoPrint();

    // doc.addMetadata(addInfoDataArray);

    // doc.fromHTML("<h1>Balaco Baco </h1>", 15, 20);
    // doc.text(` + ${addInfoDataArray} resultado = ${totalReceived}  `, 10, 10);
    // doc.save(`${storedAllFinances[idUrlNumber].name}.pdf`);

    /// kkkkkkkkkkkkkkkkkkkkkkkl
    //Vou deixar quieto isso do pdf ta dando muito trabalho

    window.print();
  }

  const [tablePrint, setTablePrint] = useState(false);

  return (
    <>
      <button onClick={() => setTablePrint(false)}>
        <GoArrowLeft />
      </button>
      {tablePrint ? (
        <TablePdf
          totalReceived={totalReceived}
          totalExpense={totalExpense}
          finalResult={finalResult}
        />
      ) : (
        <>
          <header className="headerManager">
            <div className="nameAndLinkReturn">
              <Link to="/">
                <GoArrowLeft title="Voltar a Pagina incial" />
              </Link>

              <h1>{storedAllFinances[idUrlNumber].name}</h1>

              <button onClick={transformPdf}>Imprimir</button>
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
            <section className="topoInputs">
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
                        <td className="tdButton">
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
                        colSpan={4}
                        style={{
                          backgroundColor: "rgb(127, 172, 255)",
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        <button onClick={() => setTablePrint(true)}>
                          Finalizar
                        </button>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              )}
            </section>
          </div>
        </>
      )}
    </>
  );
}
