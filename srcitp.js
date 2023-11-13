
STORE = [
  { question: "What does HTML mean?",
  answer: ["Hypertext Markup Language", "Home Make Land", "Honey Mustard Love", "House Marker Lungs" ],
  correctAnswer:"Hypertext Markup Language"
  },
  { question: "What does CSS mean?",
  answer: ["Cascading Style Sheets", "Cookies Style Sheets", "Cook Style Style", "Come Sweet Stuff"],
  correctAnswer:"Cascading Style Sheets"
  },
  { question: "Who invented HTML?",
  answer: ["Tom Juju", "Tim Berners", "Naruto Uzumaki", "Donald Trump"],
  correctAnswer: "Time Berners"
  },
  { question: "What is jQuery?",
  answer: ["JavaScript library", "Jucie", "A Game", "A Country"],
  correctAnswer: "JavaScript library"
  },
  { question: "What's JS mean?",
  answer: ["Juice Soul", "Jave Sad", "JavaScript", "ScriptJava"],
  correctAnswer: "JavaScript"
  }
]
// sets initial values to zero for the question number and score //

let qNumber = 0;
let score = 0;

// event listener for start quiz button. Hides the start page and calls the function generateQuizQuestion //
function startQuiz() {
  $('main').on('click', '#button-start', function(event){
      $('.start-quiz').hide();
      generateQuizQuestion();
  });
}

// begins displaying quiz questions from the STORE array until the very last question has been displayed, then calls the displayResults function //
function generateQuizQuestion() {
  if (qNumber < STORE.length) {
  let question =$(`<form class ="js-quiz-form">
  <legend class = "question">${STORE[qNumber].question}</legend>
  <ul class="radiogroup" role="radiogroup" aria-labelledby="question"></ul>`);
  let answers = STORE[qNumber].answer.map(function(answerValue, answerIndex){
      return `<label for="${answerValue}"><input type="radio" id="${answerValue}" name="answer" tabindex="${answerIndex}" value="${answerValue}" aria-checked="false" required>${answerValue}</label><br>`;
  });
  let button = $(`<button type="submit" id ="button-submit">Submit</button></form>`)
  $('.js-quiz').append(question);
  $('.radiogroup').append(answers, button);
  questionNumber();
} else {
  displayResults();
}

}

//event listener for the submit button. Then checks to see if an input is selected, and if the answer selected is correct//
function questionChecker(){
  $('main').on('click','#button-submit', function (event){
      if ($('input:radio').is(':checked')) {
      event.preventDefault();
      let selectedAnswer= $("input[name=answer]:checked").val();
      console.log(selectedAnswer);
      if (selectedAnswer === STORE[qNumber].correctAnswer) {
          rightAnswer();
      } else {
              wrongAnswer();
          }
      }else {
          alert('Please select an answer.')
      }
  });
}

// updates the question number and displays it at the top of the page //
function questionNumber(){
  $('header').find('#question-number').text(qNumber+1);
}

// keeps score of correct answers //
function scoreKeeper(){
  score++;
  $('header').find('#score').text(`${score}/5`);

}

//displays the page for when the answer is right //
function rightAnswer() {
  console.log('rightAnswer ran');
  $('.js-quiz-form').hide();
  $('.js-answer').append(`<h2>You're Right!</h2>
  <p>Great Job.</p>
  <button type="button" id ="button-next">Next Question</button>`).show();
  scoreKeeper();
}

// displays page for when the answer is wrong//
function wrongAnswer() {
  $('.js-quiz-form').hide();
  $('.js-answer').append(`<h2>That answer is not quite right...</h2>
       <h3>The correct answer is:</h3>
      <p><span class="correct-answer">${STORE[qNumber].correctAnswer}</span></p>
      <button type="button" id ="button-next">Next</button>`).show();
}

// event listener for the next question button //
function nextQuestion() {
  $('main').on('click','#button-next', function(event) {
      $('.js-answer').empty();
      $('.js-quiz-form').empty();
      qNumber++;
      generateQuizQuestion();
      $('js-quiz-form').show();
  });
}

// displays the final percentage score//
function displayResults(){
  console.log("`displayResults` ran");
  let finalScore = (score/5)*100;
  $('.js-answer').append(`<h2>Quiz Results</h2>

  <h3>${finalScore}%</h3>
  <p>You got <span class="right-answers">${score} </span>out of 5 questions right.</p>
  <button type="button" id ="button-restart">Start a New Quiz</button>`)
}

function restartQuiz(){
  console.log('restart quiz ran');
$('main').on('click', '#button-restart', function(event){
   console.log('restart button clicked');
  score = 0;
  qNumber = 0;
  $('.js-answer').empty();
  $('.js-quiz-form').empty();
  $('.start-quiz').show();
  $('header').find('#score').text(`${score}/5`);
  $('header').find('#question-number').text(`${qNumber}`);
});
}

function handleQuizApp(){
  startQuiz();
  questionChecker();
  nextQuestion();
  restartQuiz();
}

// calls the handleQuizApp to activate functions with event listeners //
$(handleQuizApp);
