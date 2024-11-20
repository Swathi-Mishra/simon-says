let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow", "purple", "green"];
let started = false;
let level = 0;
let highScore = localStorage.getItem("highScore") || 0;

let h2 = document.querySelector("h2");

// Event Listener for Starting the Game
document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        h2.innerText = `Level ${level}`;
        levelUp();
    }
});

// Web Audio API Sound Generator
function playSound(frequency) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = "sine"; // Wave type: sine, square, triangle, or sawtooth
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);

    oscillator.start();
    setTimeout(() => {
        oscillator.stop();
    }, 250); // Sound duration
}

// Button Sound Frequencies
const sounds = {
    red: 261.63, // C4
    yellow: 293.66, // D4
    green: 329.63, // E4
    purple: 349.23, // F4
};

// Flash Button with Sound
function flashButton(btn, isUser = false) {
    const originalColor = btn.style.backgroundColor;
    const color = btn.id;

    // Play Sound
    const frequency = sounds[color];
    if (frequency) {
        playSound(frequency);
    }

    btn.style.backgroundColor = isUser ? "white" : "lightgrey";
    setTimeout(() => {
        btn.style.backgroundColor = originalColor;
    }, 250);
}

// Advance to the Next Level
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    const randIdx = Math.floor(Math.random() * btns.length);
    const randColor = btns[randIdx];
    const randBtn = document.getElementById(randColor);

    gameSeq.push(randColor);
    flashButton(randBtn);
}

// Check User Input
function checkAnswer(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        if (level > highScore) {
            highScore = level;
            localStorage.setItem("highScore", highScore);
        }
        h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>High Score: <b>${highScore}</b>
        <br>Press any key to restart.`;

        // Reset styles for Game Over text in dark mode
        if (document.body.classList.contains("dark")) {
            h2.style.color = "#ffffff"; // Explicitly set color to white
        } else {
            h2.style.color = "#333"; // Default text color for light mode
        }

        // Flash background color briefly
        document.body.style.backgroundColor = "red";
        setTimeout(() => {
            document.body.style.backgroundColor = document.body.classList.contains("dark") ? "#121212" :
             "#f4f4f9";
        }, 300);

        reset();
    }
}


// Handle User Button Click
function handleButtonClick() {
    const btn = this;
    flashButton(btn, true);
    const userColor = btn.id;
    userSeq.push(userColor);
    checkAnswer(userSeq.length - 1);
}

// Attach Click Handlers to Buttons
document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", handleButtonClick);
});

// Reset Game State
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}


// Apply Dark Mode Preference
document.getElementById("darkMode").addEventListener("change", function () {
    const isDark = this.checked;
    document.body.classList.toggle("dark", isDark);
    document.querySelector("header").classList.toggle("dark", isDark);
    document.querySelector("footer").classList.toggle("dark", isDark);
    document.querySelector("main").classList.toggle("dark", isDark);

    // Save dark mode preference
    localStorage.setItem("darkMode", isDark);
});

// Load Dark Mode Preference on Page Load
window.addEventListener("load", () => {
    const isDark = localStorage.getItem("darkMode") === "true";
    document.getElementById("darkMode").checked = isDark;
    if (isDark) {
        document.body.classList.add("dark");
        document.querySelector("header").classList.add("dark");
        document.querySelector("footer").classList.add("dark");
        document.querySelector("main").classList.add("dark");
    }
});








// let gameSeq = [];
// let userSeq = [];

// let btns = ["red","yellow","purple","green"];

// let started = false;
// let level = 0;
// let highScore = 0;


// let h2 = document.querySelector("h2");

// document.addEventListener("keypress", function(){
//     if(started == false){
//         console.log("game is started");
//         started = true;

//         levelUp();
//     }
// });
// function gameFlash(btn) {
//     btn.classList.add("flash");
//     setTimeout( function () {
//         btn.classList.remove("flash");
//     }, 250);
// } 
// function userFlash(btn) {
//     btn.classList.add("userflash");
//     setTimeout( function () {
//         btn.classList.remove("userflash");
//     }, 250);
// }

// function levelUp() {
//     userSeq=[];
//     level++;
//     h2.innerText = `Level ${level}`;

//     let randIdx = Math.floor(Math.random()*3);
//     let randColor = btns[randIdx];
//     let randBtn = document.querySelector(`.${randColor}`);
//     gameSeq.push(randColor);
//     console.log(gameSeq);
//     gameFlash(randBtn);
// }

// function checkAns(idx) {
//     if(userSeq[idx] === gameSeq[idx]){
//     if(userSeq.length == gameSeq.length){
//         setTimeout(levelUp,1000);
//     }
//     } else{
//         if (level > highScore) {
//             highScore = level;
//         }
//         h2.innerHTML = `Game Over! Your score was <b>${level}</b><br> High Score: <b>${highScore}</b><br>
//         <br> Press any key to start. `;
//         document.querySelector("body").style.backgroundColor = "red";
//         setTimeout(function () {
//             document.querySelector("body").style.backgroundColor = "white";
//         },300);
//         reset();
//     }
// }

// function btnPress() {
//     let btn = this;
//     userFlash(btn);

//     userColor = btn.getAttribute("id");
//     userSeq.push(userColor);

//     checkAns(userSeq.length-1);
// }  

// let allBtns = document.querySelectorAll(".btn");
// for(btn of allBtns){
//     btn.addEventListener("click",btnPress);
// }

// function reset() {
//     started = false;
//     gameSeq = [];
//     userSeq = [];
//     level = 0;
// }

// // Add sound generation using Web Audio API
// SimonGame.playSound = function (frequency) {
//     const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

//     // Create an oscillator to generate sound
//     const oscillator = audioCtx.createOscillator();
//     const gainNode = audioCtx.createGain();

//     oscillator.type = "sine"; // Wave type: sine, square, triangle, sawtooth
//     oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime); // Frequency in Hz
//     oscillator.connect(gainNode);
//     gainNode.connect(audioCtx.destination);

//     // Control volume
//     gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);

//     // Start and stop the sound
//     oscillator.start();
//     setTimeout(() => {
//         oscillator.stop();
//     }, 250); // Sound duration in milliseconds
// };

// // Map each button to a specific frequency
// SimonGame.sounds = {
//     red: 261.63, // C4
//     yellow: 293.66, // D4
//     green: 329.63, // E4
//     purple: 349.23, // F4
// };

// // Modify the flashButton function to include Web Audio API sound
// SimonGame.flashButton = function (color, isUser = false) {
//     const btn = document.getElementById(color);
//     const originalColor = btn.style.backgroundColor;

//     // Play the corresponding sound
//     const frequency = this.sounds[color];
//     if (frequency) {
//         this.playSound(frequency);
//     }

//     if (isUser) {
//         btn.style.backgroundColor = "white";
//     } else {
//         btn.style.backgroundColor = "lightgrey";
//     }

//     setTimeout(() => {
//         btn.style.backgroundColor = originalColor;
//     }, 250);
// };
