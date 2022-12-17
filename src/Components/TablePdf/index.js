import { useEffect, useState } from "react";

// import "./styles.css";

import { useParams } from "react-router-dom";

import { FiArrowUpCircle, FiArrowDownCircle } from "react-icons/fi";

export default function TablePdf({ totalReceived, totalExpense, finalResult }) {
  const idUrl = useParams();
  const idUrlNumber = parseInt(idUrl.id);

  const [storedAllFinances, setStoredAllFinances] = useState(
    JSON.parse(localStorage.getItem("arrayAllFinances")) || []
  );

  const [addInfoDataArray, setAddInfoDataArray] = useState(
    storedAllFinances[idUrlNumber].infoData || []
  );

  return (
    <>
      <h1 style={{ textAlign: "center" }}>
        {storedAllFinances[idUrlNumber].name}
      </h1>
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {addInfoDataArray.map((item, index) => (
            <tr key={index}>
              <td className="tdProductValue">{item.product} </td>
              <td className="tdProductValue">{`R$ ${item.values}`}</td>
              <td className="tdType">
                {item.valueType === "entrada" ? (
                  // <FiArrowUpCircle size="20" color="green" />
                  <p>Entrada</p>
                ) : (
                  <p>Saida</p>
                  // <FiArrowDownCircle size="20" color="red" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table style={{ marginTop: "3rem" }}>
        <thead>
          <tr>
            <th>Total Entrada</th>
            <th>Total Saida</th>
            <th>Resultado Final</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {totalReceived.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </td>
            <td>
              {totalExpense.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </td>
            <td>
              {finalResult.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </td>
          </tr>
        </tbody>
      </table>

      <button onClick={() => window.print()}>i am here</button>
    </>
  );
}
