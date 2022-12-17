import { useEffect, useState } from "react";

// import "./styles.css";

import { useParams } from "react-router-dom";

import { AiFillDelete } from "react-icons/ai";
import { FiArrowUpCircle, FiArrowDownCircle } from "react-icons/fi";

export default function TablePdf() {
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

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        {storedAllFinances[idUrlNumber].name}
      </h1>
      <table>
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
                <button>
                  <AiFillDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
