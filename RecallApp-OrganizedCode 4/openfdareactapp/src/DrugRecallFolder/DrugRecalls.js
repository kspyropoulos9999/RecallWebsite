import React, { useEffect, useState } from "react";
import fetchDrugRecalls from "../DrugRecallFolder/DrugAPI";
import DrugRecallResults from "../DrugRecallFolder/DrugRecallResults";
import SearchFields from "../SearchFields";
import "../App.css"; // Importing styles from the CSS file

const DrugRecalls = () => {
  const initialSearchCriteria = {
    city: "",
    state: "",
    country: "",
    month: "",
    year: ""
  };

  const [drugSearchCriteria, setDrugSearchCriteria] = useState(initialSearchCriteria);
  const [storedSearchCriteria, setStoredSearchCriteria] = useState(null);
  const [recalls, setRecalls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchButtonClicked, setFetchButtonClicked] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    // Add 'slide-in' class to wrapper div after component is mounted
    setAnimationDone(true);
  }, []);

  const handleDrugInputChange = (e) => {
    const { name, value } = e.target;
    setDrugSearchCriteria({ ...drugSearchCriteria, [name]: value });
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const sortedRecalls = await fetchDrugRecalls();
      setRecalls(sortedRecalls);
      setStoredSearchCriteria({ ...drugSearchCriteria });
      setFetchButtonClicked(true);
    } catch (error) {
      setError("An error occurred while fetching recall data.");
    } finally {
      setLoading(false);
    }
  };

  const filterRecalls = () => {
    if (!storedSearchCriteria) {
      return [];
    }

    return recalls.filter((recall) => {
      const recallYear = recall.recall_initiation_date.substring(0, 4);
      const recallMonth = recall.recall_initiation_date.substring(4, 6);

      return (
        (!storedSearchCriteria.city || recall.city.toLowerCase().includes(storedSearchCriteria.city.toLowerCase())) &&
        (!storedSearchCriteria.state || recall.state.toLowerCase().includes(storedSearchCriteria.state.toLowerCase())) &&
        (!storedSearchCriteria.country || recall.country.toLowerCase().includes(storedSearchCriteria.country.toLowerCase())) &&
        (!storedSearchCriteria.year || recallYear === storedSearchCriteria.year) &&
        (!storedSearchCriteria.month || recallMonth === storedSearchCriteria.month)
      );
    });
  };

  return (
    <div className={`drug-recall-screen ${animationDone ? 'slide-in active' : ''}`}>
      <div className="wrapper">
        <header>
          <h1>Drug Recall Information</h1>
          <SearchFields searchCriteria={drugSearchCriteria} handleInputChange={handleDrugInputChange} />
          <div className="btn-cont">
            <button className="fetch-button" onClick={handleSearch}>
              Fetch Drug Recalls
            </button>
          </div>
        </header>
        {loading ? (
          <p>Loading...</p>
        ) : fetchButtonClicked ? (
          <React.Fragment>
            {filterRecalls().length === 0 ? (
              <p>No records found</p>
            ) : (
              <DrugRecallResults loading={loading} filterRecalls={filterRecalls} error={error} />
            )}
          </React.Fragment>
        ) : null}
      </div>
    </div>
  );
};

export default DrugRecalls;
