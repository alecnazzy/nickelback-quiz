var questionState = 0;
var active = true;
var userScore = [
  0, // Curb
  0, // The State
  0, // Silver Side Up
  0, // The Long Road
  0, // All The Right Reasons
  0, // Dark Horse
  0, // Here and Now
  0, // No Fixed Address
  0, // Feed The Machine
  0, // Get Rollin'
];
var tempScore = userScore;

var questions = [
  "Your friend hands you the aux cord, what are you playing?",
  "You only have one artist's music to listen to, who do you choose?",
  "If you could go back in time what would you do?",
  "Who is your favorite Nickelback member?",
  "How much do you love Nickelback?",
];

var answers = [
  //1 Your friend hands you the aux cord, what are you playing?
  [
    "Rock",
    "Metal",
    "Pop",
    "You're not allowed to have the aux cord(Nickelback)",
  ],
  //2 You only have one artist's music to listen to, who do you choose?
  ["Metallica", "Nirvana", "Nickelback", "Anyone but Nickelback"],
  //3 If you go back in time what would you do?
  [
    "Go back to your favorite memory",
    "Go back with the winning lottery numbers",
    "Go back to see Nickelback's first show",
    "Stop 9/11",
  ],
  //4 Who is your favorite Nickelback member?
  ["Chad Kroeger", "Ryan Peake", "Mike Kroeger", "Daniel Adair"],
  //5 How much do you love Nickelback?
  [
    "I have a shrine dedicated to them",
    "I love them",
    "They're ok",
    "Not at all, because I have good taste",
  ],
];

var answerValues = [
  //1 Your friend hands you the aux cord, what are you playing?
  [
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0], // Rock
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0], // Metal
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 1], // Pop
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0], // You're not allowed to have the aux cord(Nickelback)
  ],

  //2 You only have one artist's music to listen to, who do you choose?
  [
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0], // Metallica
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 1], // Nirvana
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0], // Nickelback
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0], // Anyone but Nickelback
  ],

  //3 If you go back in time what would you do?
  [
    [0, 0, 0, 0, 1, 0, 0, 0, 1, 1], // Go back to the your favorite memory
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 0], // Go back with the winning lottery numbers
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0], // Go back to see Nickelback's first show
    [0, 0, 1, 1, 1, 0, 0, 0, 0, 0], // Stop 9/11
  ],

  //4 Who is your favorite Nickelback member?
  [
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0], // Chad Kroeger
    [0, 0, 1, 1, 1, 0, 0, 0, 0, 0], // Ryan Peake
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0], // Mike Kroeger
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1], // Daniel Adair
  ],

  //5 How much do you love Nickelback?
  [
    [0, 1, 0, 1, 1, 0, 0, 0, 0, 0], // I have a shrine dedicated to them
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0], // I love them
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 0], // They're ok
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1], // Not at all, because I have good taste
  ],
];

var btn = document.getElementById("btn");
btn.addEventListener("click", changeState);

// Adds values of tempStats to userStats based on user selection and advances quiz progress if not at the end of the quiz
function changeState() {
  updatePersonality();

  if (active) {
    initText(questionState);
    questionState++;

    btn.innerHTML = "Select";
    btn.disabled = true;
  } else {
    setResults();
  }
}

// Initializes the quiz html content based on the current question
function initText(question) {
  var answerSelection = ""; //text varialbe containting HTML code for the radio buttons' content

  /* Creates radio buttons based on user progress through the quiz - current 'id' generation is not w3c compliant*/

  for (i = 0; i < answers[question].length; i++) {
    answerSelection +=
      "<li><input type='radio' name='question" +
      (question + 1) +
      "' onClick='setAnswer(" +
      i +
      ")' ' id='" +
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

// Sets the tempStats based on the user's selection and enables the submit button if the user has not reached the end of the quiz
function setAnswer(input) {
  clearTempScore(); //clear tempStats in case user reselects their answer

  tempScore = answerValues[questionState - 1][input]; //selects personality values based on user selection

  if (questionState < questions.length) {
    /*True while the user has not reached the end of the quiz */

    btn.innerHTML = "Continue";
    btn.disabled = false;
  } else {
    active = false;
    btn.disabled = false;
  }
}

// Clears the tempStats array to prepare for the next question
function clearTempScore() {
  tempScore = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}

// Adds the tempStats to the userStats
function updatePersonality() {
  for (i = 0; i < userScore.length; i++) {
    userScore[i] += tempScore[i];
  }
}

var quiz = document.getElementById("quiz-container");
var results = document.getElementById("result-container");
var result = document.getElementById("result");
results.style.display = "none";

// Sets the results of the quiz based on the userStats
function setResults() {
  var highestScorePosition = 0;

  // This statement loops through all personality stats and updates highestScorePosition based on a highest stat
  for (i = 1; i < userScore.length; i++) {
    if (userScore[i] > userScore[highestScorePosition]) {
      highestScorePosition = i;
    }
  }

  displayResults(highestScorePosition);

  quiz.style.display = "none";
  results.style.display = "block";
}

/* BUILDS WEB PAGE AS PER RESULTS OF THE QUIZ */

// The following code manipulates the CSS based on the personality results
var title = document.getElementById("result-title");
var cover = document.getElementById("result-cover");
var description = document.getElementById("result-description");

function displayResults(personality) {
  switch (personality) {
    case 0:
      title.innerText = "You are Curb!";
      cover.style.backgroundImage = "url('public/Curb-cover.jpg')";
      description.innerText =
        "Curb is the debut album by Nickelback. You're probably old and still think grunge is cool.";
      break;
    case 1:
      title.innerText = "You are The State!";
      cover.style.backgroundImage = "url('public/thestate-cover.jpg')";
      description.innerText =
        "The State is the second studio album by Nickelback. You're a little rough around the edges.";
      break;
    case 2:
      title.innerText = "You are Silver Side Up!";
      cover.style.backgroundImage = "url('public/silversideup-cover.jpg')";
      description.innerText =
        "Silver Side Up is the third studio album by Nickelback. This album was released on September 11th, 2001...luck is not on your side.";
      break;
    case 3:
      title.innerText = "You are The Long Road!";
      cover.style.backgroundImage = "url('public/thelongroad-cover.jpg')";
      description.innerText =
        "The Long Road is the fourth studio album by Nickelback. You're probably the middle child.";
      break;
    case 4:
      title.innerText = "You are All The Right Reasons!";
      cover.style.backgroundImage =
        "url('public/AllTheRightReasons-cover.jpg')";
      description.innerText =
        "All The Right Reasons is the fifth studio album by Nickelback. You are either very sentimental or an internet troll.";
      break;
    case 5:
      title.innerText = "You are Dark Horse!";
      cover.style.backgroundImage = "url('public/darkhorse-cover.jpg')";
      description.innerText =
        "Dark Horse is the sixth studio album by Nickelback. You were probably the kid that would wear Tapout clothes to school.";
      break;
    case 6:
      title.innerText = "You are Here and Now!";
      cover.style.backgroundImage = "url('public/hereandnow-cover.jpg')";
      description.innerText =
        "Here and Now is the seventh studio album by Nickelback. This album got beat on the charts by a Michael Buble christmas album. You're festive!";
      break;
    case 7:
      title.innerText = "You are No Fixed Address!";
      cover.style.backgroundImage = "url('public/nofixedaddress-cover.jpg')";
      description.innerText =
        "No Fixed Address is the eighth studio album by Nickelback. You have awful taste!";
      break;
    case 8:
      title.innerText = "You are Feed The Machine!";
      cover.style.backgroundImage = "url('public/feedthemachine-cover.jpg')";
      description.innerText =
        "Feed The Machine is the ninth studio album by Nickelback. Skynet is that you?.";
      break;
    case 9:
      title.innerText = "You are Get Rollin'!";
      cover.style.backgroundImage = "url('public/getrollin-cover.jpg')";
      description.innerText =
        "Get Rollin' is the tenth studio album by Nickelback. You're a Nickelback 10, which means you're a 6 in real life.";
      break;

    default:
      document.getElementById("error").style.display = "inline-block";
  }
}
