import React from 'react';

const Question = ({ question, options, onSelectOption }) => (
  <div>
    <h2>{question}</h2>
    <ul>
      {options.map((option, index) => (
        <li key={index} onClick={() => onSelectOption(index)}>
          {option}
        </li>
      ))}
    </ul>
  </div>
);

export default Question;
