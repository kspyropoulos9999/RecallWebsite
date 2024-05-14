import React, { useEffect, useState } from "react";
import fetchDeviceRecalls from "../DeviceRecallFolder/DeviceAPI";
import DeviceRecallResults from "../DeviceRecallFolder/DeviceRecallResults";
import SearchFields from "../SearchFields";
import "../App.css"; // Importing styles from the CSS file

const DeviceRecalls = () => {
  const initialSearchCriteria = {
    city: "",
    state: "",
    country: "",
    month: "",
    year: ""
  };

  const [deviceSearchCriteria, setDeviceSearchCriteria] = useState(initialSearchCriteria);
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

  const handleDeviceInputChange = (e) => {
    const { name, value } = e.target;
    setDeviceSearchCriteria({ ...deviceSearchCriteria, [name]: value });
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const sortedRecalls = await fetchDeviceRecalls();
      setRecalls(sortedRecalls);
      setStoredSearchCriteria({ ...deviceSearchCriteria });
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
    <div className={`device-recall-screen ${animationDone ? 'slide-in active' : ''}`}>
      <div className="wrapper">
        <header>
          <h1>Device Recall Information</h1>
          <SearchFields searchCriteria={deviceSearchCriteria} handleInputChange={handleDeviceInputChange} />
          <div className="btn-cont">
            <button className="fetch-button" onClick={handleSearch}>
              Fetch Device Recalls
            </button>
          </div>
        </header>
        {loading ? (
          <p>Loading...</p>
        ) : fetchButtonClicked ? (
          filterRecalls().length === 0 ? (
            <p>No records found</p>
          ) : (
            <DeviceRecallResults loading={loading} filterRecalls={filterRecalls} error={error} />
          )
        ) : null}
      </div>
    </div>
  );
};

export default DeviceRecalls;
