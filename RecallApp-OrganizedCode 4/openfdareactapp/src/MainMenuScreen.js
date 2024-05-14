import React, { useEffect } from "react";
import "./App.css"; // Assuming you have a CSS file for styling
import SubForm from "./SubForm";

const MainMenuScreen = () => {
  useEffect(() => {
    // Add 'active' class to all elements inside '.wrapper' after component is mounted
    const elements = document.querySelectorAll('.wrapper > *');
    elements.forEach(element => {
      element.classList.add('slide-in', 'active');
    });
  }, []);

  return (
    <div className="main-screen">
      <div className="wrapper">
        <h1 className="home-page header-title">Mission Statement</h1>
        <p className="home-page para">
          Simplified Recalls was developed to allow easy access to the OpenFDA
          food, drug, and device recalls without the requirement of technical
          ability. Simplified Recalls offers search parameters to narrow your
          search to a community level. Our goal is to make users aware of recall
          that effect not only themselves but their local community.{" "}
        </p>
        <h2 className="home-page header-title">How to Use</h2>
        <p className="home-page para">
          Visit the <a href="/FoodRecalls">Food</a>,{" "}
          <a href="/DrugRecalls">Drug</a>, or{" "}
          <a href="/DeviceRecalls">Device</a> page. Complete the search form at
          the top of the page and click the "Fetch Recall" button. If there are
          results that fit your search parameters the data will be displayed.
          Otherwise, a "No records found" message will appear.
        </p>
        <p className="home-page para">
          Visit the <a href="/GraphsPage">Graphs</a> page to view data
          visualization of recall data{" "}
        </p>
        <h2 className="home-page header-title">Subscribe</h2>
        <p className="home-page para">
          Stay up to date with the lattest recalls in your state by subscribing.
          you will be notified via email when there are new recalls in your state.{" "}
        </p>
        <SubForm />
      </div>
    </div>
  );
};

export default MainMenuScreen;
