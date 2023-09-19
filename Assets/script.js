// questions array data
var questions = [
    {
    question: "The function and var are known as:",
    choice: ["Keywords", "Data types", "Declaration statements", "Prototypes"],
    answer: "Declaration statements"
},
    {
    question: "Which one of the following is the correct way for calling the Javascript code?",
    choice: ["Preprocessor", "Triggering Event", "RMI", "Function/Method"],
    answer: "Function/Method"
},
    {
    question: "Which of the following type of a variable is volatile?",
    choice: ["Mutable variable", "Dynamic variable", "Volatile variable", "Immutable variable"],
    answer: "Mutable variable"
},
    {
    question: "Which of the following number object function returns the value of the number",
    choice: ["toString()", "valueOf()", "toLocaleString()", "toPrecision()"],
    answer: "valueOf()"
},
    {
    question: "A collection of elements of the same data type which may either in order or not, is called____.",
    choice: ["String", "Array", "Serialized Object", "Object"],
    answer: "Array"
}

];

// declared var
var score = 0 // user score
var questionIndex = 0; // track current question
var secondsLeft = 50; // time left
var holdInterval = 0; // countdown
var penalty = 10; // penalty for incorrect answers
var ulCreate = document.createElement("ul"); // create <ul> for choices

// time and elements DOM
var timer = document.querySelector("#start"); // start button to begin
var currentTime = document.getElementById("time"); // displays time remaining
var questionsCont = document.getElementById("questions"); // displays questions
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
// event listener for time on click
timer.addEventListener("click", function () {
    if(holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval)
                allDone();
                currentTime.textContent = "Time is up"
            }
        }, 1000);
    }
    render(questionIndex); // displays question
});

// function to render question + choice
function render(questionIndex) {
    questionsCont.innerHTML = "";
    ulCreate.innerHTML = "";

    var userQuestion = questions[questionIndex].question;
    var userChoice = questions[questionIndex].choice;
    questionsCont.textContent = userQuestion;

    questionsCont.classList.add("question"); // add question class for styling

    userChoice.forEach(function (newItem, index) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        listItem.classList.add("choice", "btn", "btn-danger", "btn-group-vertical"); // class styling + bootstrap
        
        listItem.addEventListener("click", function (event) {// event listener for selection
            compare(event, index);
        });
        ulCreate.appendChild(listItem); // Append choice to list
    });

    questionsCont.appendChild(ulCreate);
}

// function comparison 
function compare(event, choiceIndex) {
    var createFt = document.createElement("footer");
    createFt.setAttribute("class", "result");

    if (choiceIndex === questions[questionIndex].choice.indexOf(questions[questionIndex].answer)) {
        score++;
       createFt.textContent = "Correct!";

    } else {
            secondsLeft = secondsLeft - penalty // incorrect deduct time
            createFt.textContent = "Wrong!";
    }
    
    questionIndex++; // next question

    if (questionIndex >= questions.length) {
        allDone(); // end quiz
        createFt.textContent = "End of quiz your score is " + score + "/" + questions.length + ".";
    
    } else {
        render(questionIndex); // renders next question
    }

    questionsCont.appendChild(createFt);
}
      
// function handle quiz end
function allDone() {
    questionsCont.innerHTML = "";
    currentTime.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "End";
    questionsCont.appendChild(createH1);

// display final score
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");
    questionsCont.appendChild(createP);

    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is " + timeRemaining;
        questionsCont.appendChild(createP2);
    }

// label element
    var createLabel = document.createElement("label");
    createLabel.setAttribute("class", "initials");
    createLabel.textContent = "Enter your initials ";

// create input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    
// create submit btn
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "button");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.classList.add("btn", "btn-danger", "submit");
    createSubmit.textContent = "Submit";

// containner for submit and input and label for initial
    questionsCont.appendChild(createInput);
    questionsCont.appendChild(createSubmit);
    questionsCont.appendChild(createLabel);

// event listener for score submit
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {
            console.log("No value");
        } else {

// store to local.storage
            var finalScore = {
                initials: initials,
                score: timeRemaining
            };
            console.log(finalScore);
            var scores = localStorage.getItem("scores") || "[]";
            scores = JSON.parse(scores);
            scores.push(finalScore);
            console.log(scores);
            localStorage.setItem("scores",  JSON.stringify(scores));
            window.location.replace("scores.html");
        }
    });
}

