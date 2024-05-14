import React, { useState } from "react";
import "./App.css";
import MainMenuScreen from "./MainMenuScreen";
import FoodRecalls from "./FoodRecallFolder/FoodRecalls";
import DeviceRecalls from "./DeviceRecallFolder/DeviceRecalls";
import DrugRecallS from "./DrugRecallFolder/DrugRecalls";
import NavigationBar from './NavigationBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GraphsPage from "./GraphsPage"; // Import the GraphsPage component

import Footer from "./Footer";

const App = () => {
  return (
    <div>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<MainMenuScreen />} />
          <Route path="/FoodRecalls" element={<FoodRecalls />} />
          <Route path="/DeviceRecalls" element={<DeviceRecalls />} />
          <Route path="/DrugRecalls" element={<DrugRecallS />} />
          <Route path="/GraphsPage" element={<GraphsPage />} />

        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

export default App;


