import React, { useState } from 'react';
import { useEffect } from 'react';
// import '../public/index1'

let mystyle = {
  alignment:"center"
}

const questionsData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Berlin"],
    correctAnswer: "Paris",
    
  },
  {
    question: "Which planet is known as the Red Planet? ",
    options: ["Jupiter", "Mars"],
    correctAnswer: "Mars"
  },
  {
    question: "What is the tallest mammal?",
    options: ["Elephant", "Giraffe"],
    correctAnswer: "Giraffe"
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["H2O", "CO2"],
    correctAnswer: "H2O"
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["William Shakespeare", "Jane Austen"],
    correctAnswer: "William Shakespeare"
  }
];

// let selectedAnswers = [];

var leftCount = 0;
var rightCount = 0;

function QuizApp() {
  useEffect(()=>{
    const webgazer = window.webgazer;
    webgazer.setGazeListener(function(data, elapsedTime) {
      if (data == null) {
        return;
      }
      var xprediction = data.x; //these x coordinates are relative to the viewport
      var yprediction = data.y; //these y coordinates are relative to the viewport
      if(xprediction < 1000){
        leftCount++;
        console.log("left " + leftCount);
      }
      else{
        rightCount++;
        console.log("right " + rightCount);
      }

      if(rightCount >= 30 && document.getElementById("1")){
        const btn = document.getElementById("1")
        btn.classList.toggle("selected");
        
        setTimeout(()=>{
          btn.classList.toggle("selected");
          btn.click();
          leftCount = 0;
          rightCount = 0;
        },3000);
        leftCount = 0;
        rightCount = 0;
      }
      else if(leftCount >= 30 && document.getElementById("0")){
        const btn = document.getElementById("0")
        btn.classList.toggle("selected");
        setTimeout(()=>{
          btn.classList.toggle("selected");
          btn.click();
          leftCount  = 0;
          rightCount = 0;
        },3000);
        leftCount  = 0;
      }

      console.log(xprediction,yprediction); //elapsed time is based on time since begin was called
    }).begin();


  },[])
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [count,updateCount] = useState(1);

  const handleAnswerOptionClick = (selectedOption) => {
    
    if (selectedOption === questionsData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    updateCount(count+1);
    questionsData[currentQuestion].selectedAnswer = selectedOption;

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questionsData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    updateCount(1);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    leftCount = 0;
    rightCount = 0;
  };

  return (
    <div className="quiz-container">
      {showScore ? (
        <div className="score-section">
          <h1>
          You scored {score} out of {questionsData.length}
          </h1>
          
          <h1>Retry Quiz!!!</h1>
          <table className='styled-table'>
            <tr>
            <th>Question</th>
              <th>Correct</th>
              <th>selected</th>
            </tr>
            {questionsData.map((options)=>(
            <tr><td>{options.question}</td> <td>{options.correctAnswer}</td> <td>{options.selectedAnswer}</td></tr>))}
            </table>
          {setTimeout(()=>{
            resetQuiz();
    },30000)}
        </div>
      ) : (
        <div className="question-section">
          <div className="question-count" style={mystyle}>
            
          </div>
          <div className="question-text"><h5>Question {currentQuestion + 1}/{questionsData.length} </h5>
          <h3>{count+") " }{questionsData[currentQuestion].question}</h3>
          </div>
          <div className="answer-section">
           
            {questionsData[currentQuestion].options.map((option,i) => (
              <button className="answers" id = {`${i}`} key={option} onClick={() => handleAnswerOptionClick(option)}>{option}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizApp;
