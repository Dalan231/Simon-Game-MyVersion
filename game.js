var gamePattern = [];
var buttonColours = ["red", "green", "yellow", "blue"];
var userClickedPattern = [];
var level = 1;
var started = false;

$(document).on("keypress", function () {
  if (!started) {
    
    $("#level-title").text("Level "+level);

    nextSequence();
    started = true;
    
  }
});

$(".btn").on("click", function () {
  var userChosenColor = this.classList[1];
  playSound(userChosenColor);
  animatePress(userChosenColor);
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.lastIndexOf(userChosenColor));
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  
  animatePress(randomChosenColour);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      userClickedPattern = [];
      gamePattern= [];
      level++;
      $("#level-title").text("Level "+level);
      for(let i=0;i<level;i++){
        setTimeout(function(){
          
          nextSequence();
        },1000*(i+1));
      }
      
    }
  } else {
    playSound("wrong");
    $("#level-title")
      .addClass("game-over")
      .text("Game Over! Press any key to play again!");

    setTimeout(function () {
      $("#level-title").removeClass("game-over");
    }, 200);
    startOver();
  }
}
function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 1;
  started = false;
}
