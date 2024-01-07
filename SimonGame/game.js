
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var started = false;
var level = 0;



$(document).keypress(function(){

    if(!started)
    {
        $("#level-title").text("Level" + level);
        nextSequence();
        started = true;
    }
});


$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    console.log(userClickedPattern.length-1);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("GP"+gamePattern[currentLevel]);
        console.log("UCP"+ userClickedPattern[currentLevel]);
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }

    else {
        console.log("wrong");
        $("body").addClass("game-over");
        var audio =new Audio("sounds/wrong.mp3");
        audio.play();
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}


function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

};


function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed")

    }, 100);
}

function startOver()
{
    level = 0;
    started = false;
    gamePattern = [];
    $("#level-title").text("Press A Key to Start !");
}




