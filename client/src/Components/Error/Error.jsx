import React from "react";

export default function Error({ error }) {
  return (
    <div className="error-container">
      <h1>Error</h1>
      <p>{error.message}</p>
    </div>
  );
}
