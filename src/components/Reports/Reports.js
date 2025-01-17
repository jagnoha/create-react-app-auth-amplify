import React from 'react'
import { SemanticToastContainer, toast } from 'react-semantic-toasts'


export default function Reports() {
    return (
      <div style={divStyle}>
      <SemanticToastContainer position="top-center" />
      <h1>Reports</h1>
      </div>
    );
    
  }

  const divStyle = {
    margin: '3em'
  };

  const paginationStyle = {
    display: "flex",
          justifyContent: "center",
          alignItems: "center"
  }