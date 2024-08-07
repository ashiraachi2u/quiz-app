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

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleOptionSelect = (index) => {
    const isCorrect = index === state.questions[state.currentQuestionIndex].correct;
    setAnswerStatus(isCorrect ? 'correct' : 'wrong');
    setShowResult(true);
    dispatch({ type: 'ANSWER_QUESTION', payload: { isCorrect } });

    setTimeout(() => {
      setShowResult(false);
      setAnswerStatus(null);
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
      dispatch({ type: 'NEXT_QUESTION' });
    }, 5000);
  };

  return (
    <div>
      {!quizStarted ? (
        <button onClick={handleStartQuiz}>Start Quiz</button>
      ) : (
        <>
          {state.currentQuestionIndex < state.questions.length ? (
            <>
              {!showResult ? (
                <>
                  <Question
                    question={state.questions[state.currentQuestionIndex].question}
                    options={state.questions[state.currentQuestionIndex].options}
                    onSelectOption={handleOptionSelect}
                  />
                  <Timer key={state.currentQuestionIndex} time={5} onTimeUp={handleTimeUp} />
                </>
              ) : (
                <div>
                  {answerStatus === 'correct' && 'Correct!'}
                  {answerStatus === 'wrong' && 'Wrong!'}
                  {answerStatus === 'not answered' && 'Not Answered!'}
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
