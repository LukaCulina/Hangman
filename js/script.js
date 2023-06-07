const inputs = document.querySelector(".inputs");
const reset = document.querySelector(".reset-btn");
const hint = document.querySelector(".hint span");
const guessLeft = document.querySelector(".guess-left span");
const wrongLetter = document.querySelector(".wrong-letter span");
const typingInput = document.querySelector(".typing-input");
const canvas = document.getElementById("stickman");

let word, lives, corrects = [], incorrects = [];

const canvasCreator = () => {
    let context = canvas.getContext("2d");
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 2;
    //For drawing lines
    const drawLine = (fromX, fromY, toX, toY) => {
      context.moveTo(fromX, fromY);
      context.lineTo(toX, toY);
      context.stroke();
    };
    const head = () => {
      context.beginPath();
      context.arc(70, 30, 10, 0, Math.PI * 2, true);
      context.stroke();
    };
    const body = () => {
      drawLine(70, 40, 70, 80);
    };
    const leftArm = () => {
      drawLine(70, 50, 50, 70);
    };
    const rightArm = () => {
      drawLine(70, 50, 90, 70);
    };
    const leftLeg = () => {
      drawLine(70, 80, 50, 110);
    };
    const rightLeg = () => {
      drawLine(70, 80, 90, 110);
    };
    const bottom = () => {
        drawLine(10, 130, 130, 130);
      };
      const left = () => {
        drawLine(10, 10, 10, 131);
      };
      const top = () => {
        drawLine(10, 10, 70, 10);
      };
      const down = () => {
        drawLine(70, 10, 70, 20);
      };
    //initial frame
    const initialDrawing = () => {
      //clear canvas
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    };
    return { initialDrawing, bottom, left, top, down, head, body, leftArm, rightArm, leftLeg, rightLeg };
  };
  //draw the man
  const drawMan = (count) => {
    let { bottom, left, top, down, head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
    switch (count) {
      case 0:
        rightLeg();
        break;
      case 1:
        leftLeg();
        break;
      case 2:
        rightArm();
        break;
      case 3:
        leftArm();
        break;
      case 4:
        body();
        break;
      case 5:
        head();
        break;
      case 6:
        down();
        break;
      case 7:
        top();
        break;
      case 8:
        left();
        break;
      case 9:
        bottom();
        break;
      default:
        break;
    }
  };
  

function randomWord() {
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranObj.word;
    lives = 10; corrects = [], incorrects = []
    console.log(word);

    hint.innerText = ranObj.hint;
    guessLeft.innerText = lives;
    wrongLetter.innerText = incorrects;

    let html = "";
    for(let i = 0; i < word.length; i++){
        html += '<input type="text" disabled>';
    }
    inputs.innerHTML = html;
    let { initialDrawing } = canvasCreator();
    //initialDrawing would draw the frame
    initialDrawing();
} 
randomWord();



function initGame(e) {
    let key = e.target.value;
    if(key.match(/^[A-Za-z]+$/) && !incorrects.includes(`${key}`) && !corrects.includes(`${key}`)){
        if(word.includes(key)){
            for (let i = 0; i < word.length; i++) {
                if(word[i] === key){
                    corrects.push(key)
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else{
            lives--;
            incorrects.push(`${key}`);
            drawMan(lives);
        }
        guessLeft.innerText = lives;
        wrongLetter.innerText = incorrects;
        
    }
    typingInput.value = "";
setTimeout(() => {
    if(corrects.length === word.length){
        alert(`Congrats! You found the word ${word}`);
        randomWord(); 
    } else if(lives < 1){
        alert("Game over! No more guesses");
        for (let i = 0; i < word.length; i++) {
            inputs.querySelectorAll("input")[i].value = word[i];
        }
    }
});
    
}




reset.addEventListener("click", () => {
    randomWord(); 
});

typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus())
document.addEventListener("keydown", () => typingInput.focus())

