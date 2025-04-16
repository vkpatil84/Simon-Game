let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userChosenColour = '';
let userClickedPattern = [];
let level = 0;

initializeGame();

function initializeGame() {
    gamePattern = [];
    userClickedPattern = [];
    userChosenColour = '';
    level = 0;
    gameStarted = false;
    $('#level-title').text("Press 'A' Key to Start");
}

function resetGame() {
    initializeGame();
    $('#level-title').text("Game Over, Press Any Key to Restart");
    $(document).one('keypress', function (e) {
        if (!gameStarted) {
            $('#level-title').text("LEVEL " + level);
            gameStarted = true;
            newSequence();
        }
    });
}

$.fn.flash = function (duration, iterations) {
    duration = duration || 1000; // Default to 1 second
    iterations = iterations || 1; // Default to 1 iteration
    let iterationDuration = Math.floor(duration / iterations);

    for (let i = 0; i < iterations; i++) {
        this.fadeOut(iterationDuration).fadeIn(iterationDuration);
    }
    return this;
}
$(document).one('keypress', function (e) {
    if (!gameStarted) {
        $('#level-title').text("LEVEL " + level);
        newSequence();
        gameStarted = true;
    }
});

function makePatterns(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function newSequence() {
    // userClickedPattern = [];
    // level++;
    $('#level-title').text("LEVEL " + level);

    let randomNumber = makePatterns(0, 3);
    let randomChosenColour = buttonColours[randomNumber];
    let selectedButton = $('#' + randomChosenColour);

    gamePattern.push(randomChosenColour);
    console.log("Game Pattern", gamePattern);
    
    selectedButton.flash(500, 1);
    playSound(randomChosenColour);
}

function playSound(randomChosenColour) {
    let sound;
    sound = new Howl({
        src: ['sounds/' + randomChosenColour + '.mp3']
    });
    sound.play();
}

function animatePress(currentColour) {
    let selectedButton = $('#' + currentColour);
    selectedButton.addClass('pressed');
    setTimeout(() => selectedButton.removeClass('pressed'), 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            console.log("success");
            setTimeout(function () {
                level++;
                userClickedPattern = [];
                newSequence();
            }, 600);
        }
    } else {
        playSound("wrong");
        $('body').addClass('game-over');

        setTimeout(function () {
            $('body').removeClass('game-over');
        }, 200);

        console.log("Not matched");
        resetGame();
    }
}

$('.btn').click(function (e) {
    if (gameStarted) {
        userChosenColour = this.id; //? All are right 3
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        console.log("User Pattern", userClickedPattern);
        checkAnswer(userClickedPattern.length - 1);
    }
});

//#region OLd Other Methods

// $(document).one('keypress', function (e) {
//     // $('#level-title').text("LEVEL " + level);
//     newSequence();
// });
// console.log($(this).attr('id')); //? To Be Noted // All are right 1
// console.log(e.target.id); //? To Be Noted // All are right 2

// document.addEventListener('keydown', function (event) {
//     // doSomething()
//         newSequence();

// }, { once: true }); // This is also the way!!

// #region OLD CODE
// let event = new KeyboardEvent('keypress', {
//     key: 'Enter'
// });

// selectedButton.click();

// selectedButton.click(function () {
//     // let audio = new Audio('sounds/' + randomChosenColour + '.mp3');
//     // audio.play();

//     let obj = document.createElement("audio");
//     obj.src = 'sounds/' + randomChosenColour + '.mp3';
//     obj.play();
// });

// const rollSound = new Audio('/sounds/' + randomChosenColour + '.mp3');
//  selectedButton.click(e => rollSound.play());

// let DemoAudio = document.createElement('audio');
// DemoAudio.setAttribute('src', 'sounds/' + randomChosenColour + '.mp3');

// DemoAudio.addEventListener('ended', function () {
//     this.play();
// }, false);
//#endregion

//#region Also Imp Code
//.effect("pulsate", { times: 1 }, 1000);//.fadeTo(100, 0.3, function () { $(this).fadeTo(500, 1.0); });
// setInterval(() => {
//     selectedButton.fadeIn('slow').css('visibility', 'hidden').fadeOut().css('visibility', 'visible');
// }, 500);
//#endregion

//#endregion