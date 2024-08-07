// src/QuizContext.js
import React, { createContext, useReducer, useContext } from 'react';

const QuizContext = createContext();

const initialState = {
  questions: [
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], correct: 2 },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], correct: 1 },
    { question: "Who wrote 'Romeo and Juliet'?", options: ["Mark Twain", "Charles Dickens", "William Shakespeare", "Jane Austen"], correct: 2 },
    { question: "What is the smallest prime number?", options: ["0", "1", "2", "3"], correct: 2 },
  ],
  currentQuestionIndex: 0,
  score: 0,
};

const quizReducer = (state, action) => {
  switch (action.type) {
    case 'ANSWER_QUESTION':
      return {
        ...state,
        score: action.payload.isCorrect ? state.score + 1 : state.score,
      };
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };
    case 'RESET_QUIZ':
      return initialState;
    default:
      return state;
  }
};

export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
