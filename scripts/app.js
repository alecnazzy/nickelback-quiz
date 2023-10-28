// ADD THESE CLOSER TO WHERE THEY ARE USED
var quiz = document.getElementById("quiz-container");
var btn = document.getElementById("btn");
var results = document.getElementById("result-container");
var result = document.getElementById("result");
results.style.display = "none";
var questionState = 0; //Keeps track of users place in quiz
var active = true; //True until last question is answered
var userScore = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var tempScore = userScore;

var questions = [
  "Question 1",
  "Question 2",
  "Question 3",
  "Question 4",
  "Question 5",
  "Question 6",
];

var answers = [
  // question 1 answers
  ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
  // question 2 answers
  ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
  // question 3 answers
  ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
  // question 4 answers
  ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
  // question 5 answers
  ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
  // question 6 answers
  ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
];

// THESE ARE ONLY PLACEHOLDERS UNTIL WE GET THE ACTUAL ANSWERS
// ADD 4 MORE VALUES TO EACH ARRAY TO MATCH NUMBER OF ALBUMS
var answerValues = [
  //question 1 answer values
  [
    [3, 0, 1, 0, 2, 0],
    [0, 0, 0, 1, 2, 3],
    [0, 3, 0, 2, 1, 0],
    [0, 2, 0, 3, 0, 1],
    [2, 1, 3, 0, 0, 0],
    [1, 0, 2, 0, 3, 0],
  ],

  //question 2 answer values
  [
    [0, 3, 0, 2, 0, 1],
    [2, 0, 0, 0, 3, 1],
    [0, 2, 0, 0, 1, 3],
    [2, 0, 3, 1, 0, 0],
    [1, 0, 0, 3, 2, 0],
    [3, 0, 1, 0, 2, 0],
  ],

  //question 3 answer values
  [
    [0, 1, 0, 0, 3, 2],
    [3, 0, 2, 0, 1, 0],
    [1, 0, 3, 0, 2, 0],
    [0, 3, 0, 1, 2, 0],
    [0, 0, 0, 2, 1, 3],
    [0, 0, 0, 3, 1, 2],
  ],

  //question 4 answer values
  [
    [2, 0, 3, 0, 1, 0],
    [0, 1, 0, 3, 0, 2],
    [0, 3, 2, 0, 0, 1],
    [0, 0, 0, 2, 1, 3],
    [2, 0, 0, 0, 3, 1],
    [3, 0, 0, 2, 1, 0],
  ],

  //question 5 answer values
  [
    [3, 0, 0, 0, 2, 1],
    [0, 2, 3, 1, 0, 0],
    [0, 0, 0, 2, 1, 3],
    [1, 3, 0, 0, 0, 2],
    [0, 0, 0, 3, 2, 1],
    [1, 0, 2, 0, 3, 0],
  ],

  //question 6 answer values
  [
    [1, 0, 0, 3, 2, 0],
    [0, 3, 0, 2, 0, 1],
    [3, 1, 0, 0, 0, 2],
    [1, 0, 0, 2, 3, 0],
    [0, 0, 3, 2, 1, 0],
    [0, 0, 1, 2, 0, 3],
  ],
];

btn.addEventListener("click", changeState);

function changeState() {
  updatePersonality(); //Adds the values of the tempStats to the userStats

  if (active) {
    initText(questionState);
    questionState++; //advances progress through quiz

    btn.innerHTML = "Select";
    btn.disabled = true; //disables button until user chooses next answer
  } else {
    /*All questions answered*/
    setResults(); //runs set up for result page
  }
}

function initText(question) {
  var answerSelection = ""; //text varialbe containting HTML code for the radio buttons' content

  /* Creates radio buttons based on user progress through the quiz - current 'id' generation is not w3c compliant*/

  for (i = 0; i < answers[question].length; i++) {
    answerSelection +=
      "<li><input type='radio' name='question" +
      (question + 1) +
      "' onClick='setAnswer(" +
      i +
      ")' id='" +
      answers[question][i] +
      "'><label for='" +
      answers[question][i] +
      "'>" +
      answers[question][i] +
      "</label></li>";
  }

  document.getElementById("questions").innerHTML = questions[question]; //set question text
  document.getElementById("answers").innerHTML = answerSelection; //set answer text
}

/* This function is called when a user selects an answer, NOT when answer is submitted */

function setAnswer(input) {
  clearTempScore(); //clear tempStats in case user reselects their answer

  tempScore = answerValues[questionState - 1][input]; //selects personality values based on user selection

  if (questionState < questions.length) {
    /*True while the user has not reached the end of the quiz */

    btn.innerHTML = "Continue";
    btn.disabled = false;
  } else {
    /*All questions answered - QUESTION TIME IS OVER!*/
    active = false;
    btn.disabled = false;
  }
}

function clearTempScore() {
  tempScore = [0, 0, 0, 0, 0, 0];
}

/*This function adds the values of the tempStats to the userStats based on user selection */

function updatePersonality() {
  for (i = 0; i < userScore.length; i++) {
    userScore[i] += tempScore[i];
  }
}

/* This function determines the highest personality value */

function setResults() {
  var highestScorePosition = 0; //highest stat defaults as 'cute'

  /* This statement loops through all personality stats and updates highestStatPosition based on a highest stat */

  for (i = 1; i < userScore.length; i++) {
    if (userScore[i] > userScore[highestScorePosition]) {
      highestScorePosition = i;
    }
  }

  displayResults(highestScorePosition); //passes the index value of the highest stat discovered

  /* Hides the quiz content, shows results content */
  quiz.style.display = "none";
  results.style.display = "block";
}

/* BUILDS WEB PAGE AS PER RESULTS OF THE QUIZ */

/* The following code manipulates the CSS based on the personality results */

function displayResults(personality) {
  switch (personality) {
    case 0:
      result.innerHTML = "case1";
      break;
    case 1:
      result.innerHTML = "case2";
      break;
    case 2:
      result.innerHTML = "case3";
      break;
    case 3:
      result.innerHTML = "case4";
      break;
    case 4:
      result.innerHTML = "case5";
      break;
    case 5:
      result.innerHTML = "case6";
      break;
    default:
      document.getElementById("error").style.display = "inline-block";
  }
}
