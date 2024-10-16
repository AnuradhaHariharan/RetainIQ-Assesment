import React from 'react';
import './Heading.css';

function Heading({ columnCount }) {
  const headings = ['','Product Filter', 'Primary Variant']; // Basic headings

  // Generate dynamic headings based on column count
  for (let i = 2; i <= columnCount; i++) {
    headings.push(`Variant ${i}`);
  }

  return (
    <div className="heading-row">
      {headings.map((heading, index) => (
        <div className="heading-cell" key={index} >
          <h3>{heading}</h3>
        </div>
      ))}
    </div>
  );
}

export default Heading;
