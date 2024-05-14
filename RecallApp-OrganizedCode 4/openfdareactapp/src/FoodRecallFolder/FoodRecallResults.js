import React, { useState } from "react";
import "../styles/RecallResults.css";
import ExportCSV from "../ExportCSV";

const ResultsFoodRecalls = ({ loading, filterRecalls, error }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const idxLastItem = currentPage * itemsPerPage;
  const idxFirstItem = idxLastItem - itemsPerPage;
  const currentItems = filterRecalls().slice(idxFirstItem, idxLastItem);

  const totalItems = filterRecalls().length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDate = (dateString) => {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return `${month}/${day}/${year}`;
  };

  const pageNumbers = [];
  let leftSide = currentPage - 2;
  if (leftSide <= 0) leftSide = 1;
  let rightSide = currentPage + 2;
  if (rightSide > totalPages) rightSide = totalPages;

  for (let number = leftSide; number <= rightSide; number++) {
    pageNumbers.push(number);
  }

  const headers = [
    { label: "Report Date", key: "reportDate" },
    { label: "State", key: "state" },
    { label: "Adress", key: "address" },
    { label: "City", key: "city" },
    { label: "Classification", key: "classification" },
    { label: "Product Description", key: "productDescription" },
    { label: "Product Quantity", key: "productQuantity:" },
    { label: "Country", key: "country" },
    { label: "Distribution Pattern", key: "distributionPattern" },
  ];

  const data = [];
  filterRecalls().forEach((recall) => {
    const tempObject = {
      reportDate: formatDate(recall.recall_initiation_date),
      state: recall.state,
      address: recall.address_1,
      city: recall.city,
      classification: recall.classification,
      productDescription: recall.product_description,
      productQuantity: recall.product_quantity,
      country: recall.country,
      distributionPattern: recall.distribution_pattern,
    };
    data.push(tempObject);
  });

  return (
    <main>
      {/* Render food recalls based on search criteria */}
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <>
          <ExportCSV data={data} headers={headers} />
          <ul className="recall-list">
            {currentItems.map((recall) => (
              <li key={recall.recall_number} className="recall-item">
                <div id="label" className="grid-item">
                  Report Date:
                </div>
                <div className="grid-item">
                  {formatDate(recall.recall_initiation_date)}
                </div>
                <div id="label" className="grid-item">
                  State:
                </div>
                <div className="grid-item">{recall.state}</div>
                <div id="label" className="grid-item">
                  Address:
                </div>
                <div className="grid-item">{recall.address_1} </div>
                <div id="label" className="grid-item">
                  City:
                </div>
                <div className="grid-item">{recall.city} </div>
                <div id="label" className="grid-item">
                  Classification:
                </div>
                <div className="grid-item">{recall.classification}</div>
                <div id="label" className="grid-item">
                  Product Description:
                </div>
                <div className="grid-item">{recall.product_description} </div>
                <div id="label" className="grid-item">
                  Product Quantity:
                </div>
                <div className="grid-item">{recall.product_quantity}</div>
                <div id="label" className="grid-item">
                  Country:
                </div>
                <div className="grid-item">{recall.country} </div>
                <div id="label" className="grid-item">
                  Distribution Pattern:
                </div>
                <div className="grid-item">{recall.distribution_pattern} </div>
              </li>
            ))}
          </ul>
          <div className="pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              {"<<"}
            </button>
            {leftSide > 1 && <button onClick={() => paginate(1)}>1</button>}
            {leftSide > 2 && <span>...</span>}
            {pageNumbers.map((number) => (
              <button
                key={number}
                className={currentPage === number ? "active" : ""}
                onClick={() => paginate(number)}
              >
                {number}
              </button>
            ))}
            {rightSide < totalPages - 1 && <span>...</span>}
            {rightSide < totalPages && (
              <button onClick={() => paginate(totalPages)}>{totalPages}</button>
            )}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              {">>"}
            </button>
          </div>
        </>
      )}
      {error && <p className="error">{error}</p>}
    </main>
  );
};

export default ResultsFoodRecalls;
