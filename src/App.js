// src/App.js
import React, { useState } from 'react';
import { QuizProvider, useQuiz } from './QuizContext';
import Question from './components/Question';
import Timer from './components/Timer';
import Result from './components/Result';
import './App.css';

const App = () => {
  const { state, dispatch } = useQuiz();
  const [quizStarted, setQuizStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleOptionSelect = (index) => {
    const isCorrect = index === state.questions[state.currentQuestionIndex].correct;
    setAnswerStatus(isCorrect ? 'correct' : 'wrong');
    setSelectedOption(state.questions[state.currentQuestionIndex].options[index]);
    setShowResult(true);
    dispatch({ type: 'ANSWER_QUESTION', payload: { isCorrect } });

    setTimeout(() => {
      setShowResult(false);
      setAnswerStatus(null);
      setSelectedOption(null);
      dispatch({ type: 'NEXT_QUESTION' });
    }, 5000);
  };

  const handleTimeUp = () => {
    setAnswerStatus('not answered');
    setShowResult(true);
    dispatch({ type: 'ANSWER_QUESTION', payload: { isCorrect: false } });

    setTimeout(() => {
      setShowResult(false);
      setAnswerStatus(null);
      setSelectedOption(null);
      dispatch({ type: 'NEXT_QUESTION' });
    }, 5000);
  };

  return (
    <div className="container">
      {!quizStarted ? (
        <button onClick={handleStartQuiz}>Start Quiz</button>
      ) : (
        <>
          {state.currentQuestionIndex < state.questions.length ? (
            <>
              {!showResult ? (
                <>
                  <div className="question">
                    {state.questions[state.currentQuestionIndex].question}
                  </div>
                  <div className="options">
                    {state.questions[state.currentQuestionIndex].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleOptionSelect(index)}
                        className={selectedOption === option ? 'selected' : ''}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <div className="timer">
                    <Timer key={state.currentQuestionIndex} time={5} onTimeUp={handleTimeUp} />
                  </div>
                </>
              ) : (
                <div className="result">
                  {answerStatus === 'correct' && `Selected option ${selectedOption} is correct!`}
                  {answerStatus === 'wrong' && `Selected option ${selectedOption} is wrong!`}
                  {answerStatus === 'not answered' && 'Not selected any option!'}
                </div>
              )}
            </>
          ) : (
            <Result score={state.score} onPlayAgain={() => dispatch({ type: 'RESET_QUIZ' })} />
          )}
        </>
      )}
    </div>
  );
};

export default () => (
  <QuizProvider>
    <App />
  </QuizProvider>
);
