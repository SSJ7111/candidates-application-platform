import React from "react";
import "./App.css";
import Page from "./layout/Page";

function App() {
  const filters = [
    {
      id: "jobRole",
      name: "Position",
      options: [
        { value: "frontend", label: "Frontend" },
        { value: "ios", label: "iOS" },
        { value: "android", label: "Android" },
        { value: "tech lead", label: "Tech Lead" },
        { value: "backend", label: "Backend" },
      ],
    },
    {
      id: "location",
      name: "Location",
      options: [
        { value: "remote", label: "Remote" },
        { value: "mumbai", label: "Mumbai" },
        { value: "chennai", label: "Chennai" },
        { value: "delhi ncr", label: "Delhi NCR" },
        { value: "bangalore", label: "Bangalore" },
      ],
    },
  ];

  return (
    <div className="App">
      <Page filters={filters} />
    </div>
  );
}

export default App;
