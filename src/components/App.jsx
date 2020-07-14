import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";

function App() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [companies, setCompanies] = useState([]);
  let companyNames = []; //To handle the case of getting data even when query=""

  const req =
    "https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=" +
    process.env.REACT_APP_ID +
    "&app_key=" +
    process.env.REACT_APP_KEY +
    "&title_only=" +
    query +
    "&results_per_page=10&content-type=application/json";

  useEffect(() => {
    companyNames = [];
    getData();
  }, [query]);

  function handleChange(e) {
    let userQuery = e.target.value;
    setSearch(userQuery);
  }

  function makeRequest(e) {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

  async function getData() {
    if (query === "") {
      setCompanies([]);
    } else {
      const response = await fetch(req);
      const jsonData = await response.json();

      for (let i = 0; i < jsonData.results.length; i++) {
        companyNames.push(jsonData.results[i].company.display_name);
      }
      setCompanies(companyNames);
    }
  }

  return (
    <div className="container">
      <form className="search-form">
        <label htmlFor="job-title">Search for jobs : </label>
        <input type="text" value={search} onChange={handleChange} />
        <button type="submit" onClick={makeRequest}>
          Search
        </button>
      </form>

      <div className="job-cards-container">
        {companies.map((company) => {
          return <JobCard companyName={company} />;
        })}
      </div>
    </div>
  );
}

export default App;
