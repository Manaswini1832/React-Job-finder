import React from "react";

export default function JobCard(props) {
  return (
    <div className="job-card">
      <h1>{props.companyName}</h1>
    </div>
  );
}
