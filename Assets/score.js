// declare variables
var score = document.querySelector("#score");
var reset = document.querySelector("#reset");
var back = document.querySelector("#backBtn");

// get scores from local.storage parse as JSON
var scores = JSON.parse(localStorage.getItem("scores"));

if (scores) { // check scores in local and iterate through each in the array
    scores.forEach(function (scoreData) {
        var createLi = document.createElement("li");
        createLi.textContent = `${scoreData.initials} ${scoreData.score}`; 
        document.getElementById("score").appendChild(createLi); // Create list item
    });
}

// event listener to reset scores on btn click
reset.addEventListener("click", function () {
    localStorage.clear(); // clear local.storage
    location.reload();
});

// event listener to navigate back
back.addEventListener("click", function() {
    window.location.replace("index.html"); // back to main
});

// function clear scores
function clearScores() {
    localStorage.clear();
    location.reload();
}

// event listener for clearing scores
clearButton.addEventListener("click", clearScores);

