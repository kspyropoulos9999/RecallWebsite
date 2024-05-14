import { CSVLink, CSVDownload } from "react-csv";

const ExportCSV = ({ data, headers }) => {
  return (
    <CSVLink data={data} headers={headers}>
      <div
        style={{
          textAlign: "right",
          position: "-webkit-sticky",
          position: "sticky",
          top: "0",
        }}
      >
        <button
          className="btn-export"
          style={{
            backgroundColor: "rgb(65, 101, 179)",
            color: "white",
            border: "none",
            borderRadius: "4px",
            margin: "10px 50px",
            cursor: "pointer",
            padding: "5px 10px",
          }}
        >
          Export
        </button>
      </div>
    </CSVLink>
  );
};

export default ExportCSV;
